import React, {useMemo} from 'react'
import {
    NavigationParams,
    SignatureRouteParams,
  } from '../../interfaces/navigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fRequestAndroidPermissionRead, pdf} from './pdf';
import { Platform } from 'react-native';
import { ScreenNames } from '../../navigation/navigation';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { useSelector } from '../../utils/store/configureStore';
import { __API__ } from '../../api/api';
import { useUploadSurvey } from '../../hooks/useUploadSurvey';

export interface SvSRParams {
    email: string
    sendToMe: boolean
}

/**
 * Upload SvSR pdf and survey and navigate on surveys screen
 *
 * @returns async function for calling two POST endpoints:
 * 
 * - `/rest/mobile-audit-execution/survey/${surveyId}/status` to send emails with SvSR pdf
 * - `/rest/mobile-audit-execution/survey/${surveyId}` to upload Survey
 *
 * Function argument is base64-string partner signature
 */
export function useUploadSvSR({
    email,
    sendToMe,
}: SvSRParams, beforeUpload: () => void): [(base64: string) => Promise<void>] {
    const navigation = useNavigation<NavigationParams>();
    const token = useSelector(state => state.auth.token);
    const {data, filters, surveyId} = useRoute<SignatureRouteParams>().params;
    const [uploadSurvey] = useUploadSurvey(surveyId)
    const uploadSvSR = useMemo(() => async (base64?: string) => {
        beforeUpload?.()
        const path = await pdf(data, filters, base64);
        const readPermissions = Platform.OS === 'android' ? await fRequestAndroidPermissionRead() : true
        if (path && readPermissions) {
          navigation.navigate(ScreenNames.SvSRPreview, {
            file: `file://${path}`,
            surveyId: data.id,
            data,
            filters,
          });
        }
        const formData = [];
        formData.push({
          name: 'signBase64',
          data: base64,
        });
        formData.push({
          name: 'emails',
          data: email,
        });
        formData.push({
          name: 'sendToMe',
          data: String(sendToMe),
        });
        formData.push({
          name: 'file',
          fileName: path,
          data: ReactNativeBlobUtil.wrap(path!),
        });
        const url = `${__API__}/rest/mobile-audit-execution/survey/${surveyId}/status`;
        try {
          const response = await ReactNativeBlobUtil.fetch(
            'POST',
            url,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              authorization: `Bearer ${token}`,
            },
            formData,
          );
          console.warn(response);
        } catch (e) {
          console.error(e);
        }

        try {
            const response = await uploadSurvey()
            navigation.navigate(ScreenNames.Surveys)
        } catch (e) {
            console.error(e)
        }
      }, [navigation, data, filters, surveyId, token, email, sendToMe, beforeUpload])
    return [uploadSvSR]
}
