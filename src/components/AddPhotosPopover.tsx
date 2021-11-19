import React from 'react';
import Popover from './Popover';
import Typography from './Typography';
import {Alert, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {filePrefix, ICON_SIZE} from '../constants/constants';
import themeConfig from '../../themeConfig';
import {useDispatch} from '../utils/store/configureStore';
import {setQuestionAddedFile} from '../features/SurveyExecution/evaluationReducer';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useTranslation} from 'react-i18next';

interface AddPhotosPopoverProps {
  onDismiss: () => void;
  visible: boolean;
  paddingTop: number;
  paddingLeft: number;
  surveyId: string;
  standardId: string;
  questionId: string;
}

function AddPhotosPopover({
  onDismiss,
  visible,
  paddingTop,
  paddingLeft,
  surveyId,
  standardId,
  questionId,
}: AddPhotosPopoverProps) {
  const dispatch = useDispatch();
  const addFiles = React.useCallback(
    (assets?: Asset[]) => {
      if (assets && assets.length) {
        assets.forEach(i => {
          if (i.fileName && i.uri) {
            dispatch(
              setQuestionAddedFile({
                fileId: i.fileName,
                filePath: i.uri.substring(filePrefix.length),
                surveyId,
                standardId,
                questionId,
              }),
            );
          }
        });
      } else {
        Alert.alert('Failed to add files');
      }
    },
    [dispatch, questionId, standardId, surveyId],
  );

  const handleChoosePhoto = React.useCallback(() => {
    onDismiss();
    launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, response => {
      if (response.assets) {
        addFiles(response.assets);
      }
    });
  }, [addFiles, onDismiss]);

  const handleTakePhoto = React.useCallback(() => {
    onDismiss();
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets) {
        addFiles(response.assets);
      }
    });
  }, [addFiles, onDismiss]);

  const {t} = useTranslation();
  return (
    <Popover
      onDismiss={onDismiss}
      visible={visible}
      style={{
        paddingTop,
        paddingLeft,
        // borderStyle: 'solid',
        // borderWidth: 1,
        // borderColor: 'red',
      }}>
      <View style={styles.view}>
        <>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={handleTakePhoto}>
              <Typography size="Body 1">{t('Camera')}</Typography>
              <Icon name="camera-alt" size={ICON_SIZE} />
            </TouchableOpacity>
          </View>
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleChoosePhoto}>
              <Typography size="Body 1">{t('Photos Library')}</Typography>
              <Icon name="photo-size-select-actual" size={ICON_SIZE} />
            </TouchableOpacity>
          </View>
        </>
      </View>
    </Popover>
  );
}

export default React.memo(AddPhotosPopover);

const styles = StyleSheet.create({
  menu: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  menuItem: {
    paddingTop: 12,
    paddingRight: 14,
    paddingBottom: 12,
    paddingLeft: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view: {
    backgroundColor: themeConfig.defaultTheme.colors.background,
    width: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
