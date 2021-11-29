import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import {setQuestionAddedFile} from '../features/SurveyExecution/evaluationReducer';
import {Alert, Platform} from 'react-native';
import {filePrefix} from '../constants/constants';
import TouchableText from './TouchableText';
import {useDispatch} from '../utils/store/configureStore';
import {useTranslation} from 'react-i18next';

interface FileAttachmentProps {
  surveyId: string;
  standardId: string;
  questionId: string;
}

function FileAttachment({
  surveyId,
  standardId,
  questionId,
}: FileAttachmentProps) {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const handlePress = React.useCallback(async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        copyTo: 'documentDirectory',
        allowMultiSelection: true,
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.docx,
          DocumentPicker.types.doc,
          DocumentPicker.types.ppt,
          DocumentPicker.types.csv,
          DocumentPicker.types.plainText,
          DocumentPicker.types.pptx,
          DocumentPicker.types.xlsx,
        ],
      });
      for (const res of results) {
        if (res.fileCopyUri) {
          dispatch(
            setQuestionAddedFile({
              fileId: res.name,
              filePath:
                Platform.OS === 'ios'
                  ? res.fileCopyUri.substring(filePrefix.length)
                  : res.fileCopyUri,
              surveyId,
              standardId,
              questionId: questionId,
              useName: true,
            }),
          );
        } else {
          Alert.alert('Unable to attach file', JSON.stringify(res, null, 2));
          console.log('Unable to attach file', JSON.stringify(res, null, 2));
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        console.log('DocumentPicker::canceled');
      } else {
        console.log('DocumentPicker', err);
      }
    }
  }, [dispatch, questionId, standardId, surveyId]);
  return (
    <TouchableText iconName="attach-file" size="Button" onPress={handlePress}>
      {t('add files').toUpperCase()}
    </TouchableText>
  );
}

export default React.memo(FileAttachment);
