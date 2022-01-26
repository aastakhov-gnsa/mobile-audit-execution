import React from 'react';
import useModalVisibility from '../../../hooks/useModalVisibility';
import {CommentType} from '../../../interfaces/standard';
import TouchableText from '../../../components/TouchableText';
import CommentModal from '../../../components/CommentModal';
import {useDispatch, useSelector} from '../../../utils/store/configureStore';
import {
  overruleStandardResult,
  resetOverruleStandardResult,
} from '../evaluationReducer';
import format from 'date-fns/format';
import {OverruleStatus} from '../../../interfaces/common';
import {useTranslation} from 'react-i18next';
import {Button} from 'react-native-paper';

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
  const data = useSelector(
    state =>
      state.evaluation[surveyId].standards?.find(i => i.id === standardId)
        ?.overruleComment,
  );
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
  const handleResetOverrule = React.useCallback(() => {
    handleVisible();
    dispatch(resetOverruleStandardResult({surveyId, standardId}));
  }, [handleVisible, dispatch, surveyId, standardId]);
  const {t} = useTranslation();
  return (
    <>
      {visible && (
        <CommentModal
          visible={visible}
          onVisible={handleVisible}
          onSave={handleSave}
          chips={chips}
          validationMessage={t('Fill comment and choose a status')}
          titleText={t('Overrule result')}
          defaultText={data?.value ?? undefined}
          defaultChip={getDefaultChip(data?.overruledHint ?? undefined)}
          extraButtons={[
            <Button mode="text" onPress={handleResetOverrule}>
              {t('Reset Overrule')}
            </Button>,
          ]}
        />
      )}
      <TouchableText onPress={handleVisible} size="Button">
        {t('CHANGE RESULT')}
      </TouchableText>
    </>
  );
}

export default React.memo(OverruleResult);

function getDefaultChip(s?: string): OverruleStatus | undefined {
  if (!s) {
    return undefined;
  }
  if (s.indexOf('failed') > -1) {
    return chips[1].value;
  }
  if (s.indexOf('passed') > -1) {
    return chips[0].value;
  }
  return undefined;
}
