import React from 'react';
import {Dimensions, Modal} from 'react-native';
import {SmFile} from '../interfaces/common';
import RNImageViewer from 'react-native-image-zoom-viewer';
import {IImageInfo} from 'react-native-image-zoom-viewer/src/image-viewer.type';
import {useDispatch, useSelector} from '../utils/store/configureStore';
import {clearPhotoViewingStart} from '../features/SurveyExecution/evaluationReducer';
import {filePrefix} from '../constants/constants';

interface ImageViewerProps {
  surveyId: string;
  standardId: string;
  questionId?: string;
  images: SmFile[];
}
function ImageViewer({
  surveyId,
  standardId,
  questionId,
  images,
}: ImageViewerProps) {
  const dispatch = useDispatch();
  const initId = useSelector(state => {
    const standard = state.evaluation[surveyId].standards?.find(
      i => i.id === standardId,
    );
    return questionId
      ? standard?.questionDTOList
          ?.find(i => i.id === questionId)
          ?.files.find(i => i.options?._viewingStart)?.id
      : standard?.files?.find(i => i.options?._viewingStart)?.id;
  });
  const initIndex = images.findIndex(i => i.id === initId);
  const handleCancel = React.useCallback(() => {
    dispatch(clearPhotoViewingStart({surveyId, standardId, questionId}));
  }, [dispatch, questionId, standardId, surveyId]);
  if (initIndex === -1) {
    return null;
  }
  const imageUrls: IImageInfo[] = images.map(i => {
    return {
      url: filePrefix + i.options?._path!,
      props: {
        styles: {
          width: Dimensions.get('window').width,
        },
      },
    };
  });
  console.log('initIndex', initIndex);
  return (
    <Modal visible={true}>
      <RNImageViewer
        imageUrls={imageUrls}
        index={initIndex}
        onCancel={handleCancel}
        enableSwipeDown
      />
    </Modal>
  );
}

export default React.memo(ImageViewer);
