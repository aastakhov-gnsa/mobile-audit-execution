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
    x: 0,
    y: 0,
  });
  const containerRef = React.useRef<any>(null);
  const handlePress = React.useCallback(() => {
    if (containerRef.current) {
      containerRef.current!.measure(
        (width: any, height: any, px: any, py: any, fx: any, fy: any) => {
          setM({
            x: fx,
            y: fy,
          });
        },
      );
    } else {
      console.error('there is no containerRef.current', containerRef.current);
    }
    handleVisible();
  }, [handleVisible]);
  const {t} = useTranslation();
  return (
    <View ref={containerRef} collapsable={false}>
      <TouchableText onPress={handlePress} size="Button" iconName="camera-alt">
        {t('ADD PHOTOS')}
      </TouchableText>
      <AddPhotosPopover
        surveyId={surveyId}
        standardId={standardId}
        questionId={questionId}
        onDismiss={handleVisible}
        visible={visible}
        paddingLeft={m.x}
        paddingTop={m.y}
      />
    </View>
  );
}

export default React.memo(AddPhotos);
