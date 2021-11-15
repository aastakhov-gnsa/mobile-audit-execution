import React from 'react';
import {Dimensions, Modal} from 'react-native';

import {SmFile} from '../interfaces/common';
import RNImageViewer from 'react-native-image-zoom-viewer';

import {IImageInfo} from 'react-native-image-zoom-viewer/src/image-viewer.type';
import {useDispatch, useSelector} from '../utils/store/configureStore';
import {clearPhotoViewingStart} from '../features/SurveyExecution/evaluationReducer';

interface ImageViewerProps {
  surveyId: string;
  standardId: string;
  questionId?: string;
  images: SmFile[];
  // initIndex: number | null;
  // onDismiss: () => void;

  // visible: boolean;
  // onOpen: () => void
}
function ImageViewer({
  surveyId,
  standardId,
  questionId,
  images,
}: ImageViewerProps) {
  // if (typeof initIndex !== 'number') {
  //   return null;
  // }
  const dispatch = useDispatch();
  const initIndex = useSelector(state => {
    const standard = state.evaluation[surveyId].standards?.find(
      i => i.id === standardId,
    );
    return questionId
      ? standard?.questionDTOList
          ?.find(i => i.id === questionId)
          ?.files.findIndex(i => i.options?._viewingStart)
      : standard?.files?.findIndex(i => i.options?._viewingStart);
  });
  const handleCancel = React.useCallback(() => {
    dispatch(clearPhotoViewingStart({surveyId, standardId, questionId}));
  }, [dispatch, questionId, standardId, surveyId]);
  if (initIndex === -1) {
    return null;
  }
  const imageUrls: IImageInfo[] = images.map(i => {
    return {
      url: i.options?._path!,
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
