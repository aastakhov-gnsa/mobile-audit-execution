import html2pdf from 'react-native-html-to-pdf';
import {Platform, PermissionsAndroid} from 'react-native';
import {EvaluationSurvey} from '../../interfaces/evaluation';
import {pdfTemplate} from './pdfTemplate';

export async function pdf(
  data: EvaluationSurvey,
  filters: Record<string, boolean>,
  sign?: string
) {
  let options = {
    html: pdfTemplate(data, filters, sign),
    fileName: 'test'
  };
  if (Platform.OS === 'android') {
    const permissionGranted = await fRequestAndroidPermissionWrite();
    if (!permissionGranted) {
      console.log('access was refused');
      return;
    }
  }
  let file = await html2pdf.convert(options);
  return file.filePath;
}

const fRequestAndroidPermissionWrite = async () => {
  // Refer to https://reactnative.dev/docs/permissionsandroid for further details on permsissions
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'App1 Permission Request',
        message:
          'App1 needs access to your storage so you can save files to your device.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('permission is granted');
      return true;
    } else {
      console.log('permission denied');
      return false;
    }
  } catch (err) {
    console.error('fRequestAndroidPermission error:', err);
    return false;
  }
};

export const fRequestAndroidPermissionRead = async () => {
  // Refer to https://reactnative.dev/docs/permissionsandroid for further details on permsissions
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'App1 Permission Request',
        message:
          'App1 needs access to your storage so you can save files to your device.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('permission is granted');
      return true;
    } else {
      console.log('permission denied');
      return false;
    }
  } catch (err) {
    console.error('fRequestAndroidPermission error:', err);
    return false;
  }
};
