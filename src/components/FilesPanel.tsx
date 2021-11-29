import React from 'react';
import {SmFile} from '../interfaces/common';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {Alert, Image, Platform, StyleSheet, View} from 'react-native';
import {
  docMatcher,
  filePrefix,
  imageMatcher,
  pdfMatcher,
  xlsMatcher,
} from '../constants/constants';
import {Chip, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {NavigationParams} from '../interfaces/navigation';
import {ScreenNames} from '../navigation/navigation';
import DeleteIcon from '../assets/icons/delete.svg';
import ImageViewer from './ImageViewer';
import {useDispatch} from '../utils/store/configureStore';
import {setPhotoViewingStart} from '../features/SurveyExecution/evaluationReducer';
import FileViewer from 'react-native-file-viewer';

interface FilesPanelProps {
  surveyId: string;
  standardId: string;
  questionId?: string;
  files: SmFile[];
  onDelete?: (id: string) => void;
}

function FilesPanel({
  files,
  onDelete,
  surveyId,
  standardId,
  questionId,
}: FilesPanelProps) {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationParams>();

  const presentFiles = files.filter(i => i.options?._toDelete !== true);
  const images = presentFiles.filter(i => i.value.match(imageMatcher));
  const documents = presentFiles.filter(i => !i.value.match(imageMatcher));
  const renderPhoto = React.useCallback(
    ({item}: {item: SmFile}) => {
      return (
        <View key={item.id} style={styles.imageView}>
          {onDelete && (
            <DeleteIcon
              onPress={() => onDelete(item.id)}
              style={styles.deleteIcon}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              dispatch(
                setPhotoViewingStart({
                  surveyId,
                  standardId,
                  questionId,
                  fileId: item.id,
                }),
              );
            }}>
            <Image
              source={{uri: filePrefix + item.options!._path}}
              style={styles.imagePreview}
            />
          </TouchableOpacity>
        </View>
      );
    },
    [dispatch, onDelete, questionId, standardId, surveyId],
  );
  const photoKeyExtractor = React.useCallback(
    (item: Required<SmFile>) => item.id,
    [],
  );
  return (
    <>
      <View style={styles.container}>
        {documents.map(i => (
          <Chip
            key={i.id}
            onPress={() => {
              if (Platform.OS === 'ios') {
                navigation.navigate(ScreenNames.FileView, {
                  fileName: i.value,
                  filePath: i.options!._path!,
                });
              } else {
                FileViewer.open(i.options!._path!)
                  .then(() => {
                    // success
                    console.log('FileViewer::success');
                  })
                  .catch(err => {
                    // error
                    console.log('FileViewer::error', err);
                    Alert.alert(`${err}`);
                  });
              }
            }}
            icon={getChipIcon(i.value, colors)}
            style={styles.chip}
            mode={'outlined'}
            onClose={onDelete ? () => onDelete(i.id) : undefined}>
            {i.value}
          </Chip>
        ))}
      </View>
      <View>
        <FlatList
          horizontal
          data={images}
          renderItem={renderPhoto}
          keyExtractor={photoKeyExtractor}
        />
      </View>

      <ImageViewer
        surveyId={surveyId}
        standardId={standardId}
        questionId={questionId}
        images={images}
      />
    </>
  );
}

export default React.memo(FilesPanel);

const styles = StyleSheet.create({
  chip: {
    marginRight: 10,
    marginBottom: 10,
  },
  imageView: {
    marginRight: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  imagePreview: {width: 200, height: 186},
});

function getChipIcon(filename: string, colors: ReactNativePaper.ThemeColors) {
  return function () {
    if (filename.match(pdfMatcher)) {
      return <Icon name="picture-as-pdf" color={colors.error} />;
    }
    if (filename.match(docMatcher)) {
      return <Icon name="library-books" color={colors.primary} />;
    }
    if (filename.match(xlsMatcher)) {
      return <Icon name="library-books" color={colors.green} />;
    }
    return <Icon name="insert-drive-file" color={colors.accent} />;
  };
}
