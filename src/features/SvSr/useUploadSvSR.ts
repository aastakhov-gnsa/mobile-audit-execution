import {useMemo} from 'react';
import {
  NavigationParams,
  SignatureRouteParams,
} from '../../interfaces/navigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {pdf} from './pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {useSelector} from '../../utils/store/configureStore';
import {__API__} from '../../api/api';
import {useUploadSurvey} from '../../hooks/useUploadSurvey';
import {defaultAlert} from '../../api/apiAlerts';
import {ScreenNames} from '../../navigation/navigation';
import {localeCode} from '../../../index';
import {langMapping} from '../../constants/languages';

export interface SvSRParams {
  email: string;
  sendToMe: boolean;
  partner: string;
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
export function useUploadSvSR(
  {email, sendToMe, partner}: SvSRParams,
  beforeUpload: () => void,
): [(base64: string) => Promise<void>] {
  const navigation = useNavigation<NavigationParams>();
  const token = useSelector(state => state.auth.token);
  const {data, filters, surveyId} = useRoute<SignatureRouteParams>().params;
  const [uploadSurvey] = useUploadSurvey(surveyId);
  const uploadSvSR = useMemo(
    () => async (base64?: string) => {
      beforeUpload?.();
      const path = await pdf(data, filters, base64, partner);
      const formData = [];
      formData.push({
        name: 'signBase64',
        data: base64 ?? '',
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
        name: 'language',
        data: langMapping[localeCode],
      });
      formData.push({
        name: 'signature_name',
        data: partner,
      });
      formData.push({
        name: 'file',
        filename: path,
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
        let parsedResponse: string | Record<any, any> = '';
        try {
          parsedResponse = JSON.parse(response?.data);
        } catch {}
        if (
          typeof parsedResponse !== 'string' &&
          parsedResponse.success === false
        ) {
          defaultAlert({
            url,
            code: response.respInfo.status,
            response: parsedResponse.error.popup[0],
            requestBody: 'multipart',
            hideDetails: true,
          });
          return;
        }
      } catch (e) {
        console.error(e);
        return;
      }
      try {
        const response = await uploadSurvey();
        console.log('useUploadSvSR::uploadSurvey::response', response);
        if (response) {
          navigation.navigate(ScreenNames.Surveys, {
            // screen: ScreenNames.Surveys,
            notification: 'signed',
          });
        }
      } catch (e) {
        console.error('useUploadSvSR::uploadSurvey', e);
      }
    },
    [
      beforeUpload,
      data,
      filters,
      partner,
      email,
      sendToMe,
      surveyId,
      token,
      uploadSurvey,
      navigation,
    ],
  );
  return [uploadSvSR];
}
