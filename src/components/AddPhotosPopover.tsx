import React from 'react';
import Popover from './Popover';
import Typography from './Typography';
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {filePrefix, ICON_SIZE} from '../constants/constants';
import themeConfig from '../../themeConfig';
import {useDispatch} from '../utils/store/configureStore';
import {setQuestionAddedFile} from '../features/SurveyExecution/evaluationReducer';
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useTranslation} from 'react-i18next';
import {Callback} from 'react-native-image-picker/src/types';

interface AddPhotosPopoverProps {
  onDismiss: () => void;
  visible: boolean;
  paddingTop: number;
  paddingLeft: number;
  surveyId: string;
  standardId: string;
  questionId: string;
}

const choosePhotoOptions: ImageLibraryOptions = {
  mediaType: 'photo',
  selectionLimit: 0,
};
const takePhotoOptions: CameraOptions = {mediaType: 'photo'};

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

  const handleAddPhotos: Callback = React.useCallback(
    response => {
      if (response?.assets) {
        addFiles(response.assets);
      }
    },
    [addFiles],
  );

  const handleChoosePhoto = React.useCallback(() => {
    onDismiss();
    launchImageLibrary(choosePhotoOptions, handleAddPhotos);
  }, [handleAddPhotos, onDismiss]);

  const handleTakePhoto = React.useCallback(() => {
    onDismiss();
    launchCamera(takePhotoOptions, handleAddPhotos);
  }, [handleAddPhotos, onDismiss]);

  const {t} = useTranslation();
  const styles = makeStyles(paddingTop, paddingLeft);
  return (
    <Popover onDismiss={onDismiss} visible={visible} style={styles.popover}>
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleTakePhoto}
          key="Camera">
          <Typography size="Body 1">{t('Camera')}</Typography>
          <Icon name="camera-alt" size={ICON_SIZE} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleChoosePhoto}
          key="Photos Library">
          <Typography size="Body 1">{t('Photos Library')}</Typography>
          <Icon name="photo-size-select-actual" size={ICON_SIZE} />
        </TouchableOpacity>
      </View>
    </Popover>
  );
}

export default React.memo(AddPhotosPopover);

const w = Dimensions.get('window');

const makeStyles = (top: number = 0, left: number = 0) => {
  const popoverWidth = 280;
  const popoverHeight = 122;
  const offset = 15;
  return StyleSheet.create({
    popover: {
      marginTop:
        top + offset + popoverHeight > w.height
          ? top - offset - popoverHeight
          : top + offset,
      marginLeft: left,
      width: popoverWidth,
      height: popoverHeight,
    },
    menu: {
      width: popoverWidth,
      paddingTop: 8,
      paddingBottom: 8,
      backgroundColor: themeConfig.defaultTheme.colors.background,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
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
  });
};
