import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Surface, Switch, TextInput} from 'react-native-paper';
import Signature, {SignatureViewRef} from 'react-native-signature-canvas';
import {
  NavigationParams,
  SignatureRouteParams,
} from '../../interfaces/navigation';
import Clipboard from '@react-native-clipboard/clipboard';
import Typography from '../../components/Typography';
import {ScrollView} from 'react-native-gesture-handler';
import {__API__} from '../../api/api';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {useSelector} from '../../utils/store/configureStore';
import {fRequestAndroidPermissionRead, pdf} from './pdf';
import {ScreenNames} from '../../navigation/navigation';
import {useTranslation} from 'react-i18next';

/**
 * Android Studio emulator does not always support hardware acceleration and might crash when enabled
 */
const useHardwareAcceleration = __DEV__ ? false : true;

export function SignatureScreen() {
  const ref = useRef<SignatureViewRef>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const {data, filters, surveyId} = useRoute<SignatureRouteParams>().params;
  const [me, setMe] = useState(true);
  const navigation = useNavigation<NavigationParams>();
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);
  const handleClear = () => {
    ref.current?.clearSignature();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    setLoading(true);
    ref.current?.readSignature();
  };

  const handleOk = async (base64?: string) => {
    setLoading(false);
    if (base64) {
      Clipboard.setString(base64);
    }
    const path = await pdf(data, filters, base64);
    const readPermissions = await fRequestAndroidPermissionRead();
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
      data: String(me),
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
  };

  const [email, setEmail] = useState('');

  const handleSignTouchStart = useCallback(() => {
    setScrollEnabled(false);
  }, []);

  const handleSignTouchEnd = useCallback(() => {
    setScrollEnabled(true);
  }, []);

  const {t} = useTranslation();
  return (
    <ScrollView scrollEnabled={scrollEnabled} style={styles.container}>
      <View style={styles.tabs}>
        <Button mode="text">{t('Partner')}</Button>
        <Button mode="text">{t('Auditor')}</Button>
      </View>
      <View style={styles.content}>
        <Surface style={styles.signature}>
          <Signature
            ref={ref}
            webStyle={webStyle}
            androidHardwareAccelerationDisabled={!useHardwareAcceleration}
            descriptionText=""
            backgroundColor="white"
            minWidth={3}
            onOK={handleOk}
            onEmpty={handleOk}
            onBegin={handleSignTouchStart}
            onEnd={handleSignTouchEnd}
          />
        </Surface>
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            {t(
              "By signing the Survey Status Report I acknowledge that I have received the Survey Status Report and take notice of the results of today's audit",
            )}
          </Text>
          <Button icon="refresh" mode="text" onPress={handleClear}>
            {t('Reset Signature')}
          </Button>
        </View>
        <View style={styles.form}>
          <TextInput mode="outlined" style={styles.name} editable={false} />
          <Typography size="Body 1" style={styles.sendLabel}>
            {t('Send the report')}
          </Typography>
          <TextInput
            mode="outlined"
            placeholder={t('Enter e-mail or several, split by comma')}
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.copy}>
            <Typography size="Subtitle 1">
              {t('Send a copy of the report to me')}
            </Typography>
            <Switch style={styles.switch} value={me} onValueChange={setMe} />
          </View>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.actions}>
          <Button mode="text" onPress={handleCancel}>
            {t('cancel')}
          </Button>
          <Button mode="contained" onPress={handleNext} loading={loading}>
            {t('Save and Upload')}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  hide: {
    display: 'none',
  },
  tabs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    height: 60,
    borderColor: 'rgb(239, 239, 239)',
    paddingBottom: 2,
  },
  sendLabel: {
    fontFamily: 'Roboto-Medium',
    marginTop: 35,
  },
  form: {
    margin: 32,
  },
  signature: {
    marginTop: 32,
    marginRight: 32,
    marginLeft: 32,
    height: 458,
    elevation: 4,
  },
  name: {
    width: 374,
  },
  copy: {
    marginTop: 32,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  switch: {
    marginLeft: 12,
  },
  notice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 32,
    marginLeft: 32,
    marginTop: 32,
  },
  noticeText: {
    width: 509,
  },
  actionsContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderTopColor: 'rgb(239, 239, 239)',
    borderTopWidth: 2,
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actions: {
    display: 'flex',
    height: 'auto',
    flexDirection: 'row',
    paddingRight: 24,
  },
});

const webStyle = `.m-signature-pad--footer
    .save {
        display: none;
    }
    .clear {
        display: none;
    }
    .m-signature-pad {
        box-shadow: none; border: none;
        margin-left: 0px;
        margin-top: 0px;
      } 
       .m-signature-pad--body
        canvas {
          background-color: #E5E5F1;
        }
      .m-signature-pad--body {border: none}
      .m-signature-pad--footer {display: none; margin: 0px;}
      body,html {
         width: 100%; 
         height: 100%;
      }
`;
