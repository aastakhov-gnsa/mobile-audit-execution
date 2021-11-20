import React from 'react';
import {View} from 'react-native';
import TouchableText from './TouchableText';
import AddPhotosPopover from './AddPhotosPopover';
import useModalVisibility from '../hooks/useModalVisibility';
import {useTranslation} from 'react-i18next';

interface AddPhotosProps {
  surveyId: string;
  standardId: string;
  questionId: string;
}
function AddPhotos({surveyId, standardId, questionId}: AddPhotosProps) {
  const [visible, handleVisible] = useModalVisibility();
  const [m, setM] = React.useState({
    fx: 0,
    fy: 0,
    px: 0,
    py: 0,
    width: 0,
    height: 0,
  });
  const containerRef = React.useRef(null);
  console.log('containerRef', containerRef);
  console.log('m', m);
  const {t} = useTranslation();
  return (
    <View
      ref={containerRef}
      style={
        {
          // borderStyle: 'solid',
          // borderWidth: 1,
          // borderColor: 'red',
        }
      }
      // onLayout={e => {
      //   const layout = e.nativeEvent.layout;
      //   console.log('height:', layout.height);
      //   console.log('width:', layout.width);
      //   console.log('x:', layout.x);
      //   console.log('y:', layout.y);
      // }}
    >
      <TouchableText
        onPress={() => {
          handleVisible();
          containerRef.current?.measure((width, height, px, py, fx, fy) => {
            setM({
              fx: fx,
              fy: fy,
              px: px,
              py: py,
              width: width,
              height: height,
            });
          });
          // UIManager.measureInWindow(
          //   findNodeHandle(containerRef._nativeTag),
          //   (x, y, width, height) => {
          //     setM({x, y, width: width, height: height});
          //   },
          // );
        }}
        size="Button"
        iconName="camera-alt">
        {t('ADD PHOTOS')}
      </TouchableText>
      <AddPhotosPopover
        surveyId={surveyId}
        standardId={standardId}
        questionId={questionId}
        onDismiss={handleVisible}
        visible={visible}
        paddingLeft={m.py}
        paddingTop={m.px}
      />
    </View>
  );
}

export default React.memo(AddPhotos);
