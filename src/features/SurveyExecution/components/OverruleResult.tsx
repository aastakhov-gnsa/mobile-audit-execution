import React from 'react';
import useModalVisibility from '../../../hooks/useModalVisibility';
import {CommentType, OverruleStatus} from '../../../interfaces/standard';
import TouchableText from '../../../components/TouchableText';
import CommentModal from '../../../components/CommentModal';
import {useDispatch} from '../../../utils/store/configureStore';
import {overruleStandardResult} from '../evaluationReducer';
import format from 'date-fns/format';

interface OverruleResultProps {
  surveyId: string;
  standardId: string;
}

const chips: Array<{title: string; value: OverruleStatus}> = [
  {
    value: 'Passed - Overruled',
    title: 'Set as Passed',
  },
  {
    value: 'Failed - Overruled',
    title: 'Set as Failed',
  },
];

function OverruleResult({surveyId, standardId}: OverruleResultProps) {
  const [visible, handleVisible] = useModalVisibility();
  const dispatch = useDispatch();
  const handleSave = React.useCallback(
    ({text, chip}: {text: string; chip: CommentType | OverruleStatus}) => {
      dispatch(
        overruleStandardResult({
          surveyId,
          standardId,
          status: chip as OverruleStatus,
          commentText: text,
          time: format(Date.now(), 'dd.MM.yy, HH:mm'),
        }),
      );
    },
    [dispatch, standardId, surveyId],
  );
  return (
    <>
      {visible && (
        <CommentModal
          visible={visible}
          onVisible={handleVisible}
          onSave={handleSave}
          chips={chips}
          validationMessage="Fill comment and choose a status"
          titleText="Overrule result"
        />
      )}
      <TouchableText onPress={handleVisible} size="Button">
        CHANGE RESULT
      </TouchableText>
    </>
  );
}

export default React.memo(OverruleResult);
