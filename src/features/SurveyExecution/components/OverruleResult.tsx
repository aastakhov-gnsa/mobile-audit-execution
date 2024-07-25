import React from 'react';
import useModalVisibility from '../../../hooks/useModalVisibility';
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

function OverruleResult({surveyId, standardId}: OverruleResultProps) {
  const [visible, handleVisible] = useModalVisibility();
  const data = useSelector(state =>
    state.evaluation[surveyId].standards?.find(i => i.id === standardId),
  );
  const dispatch = useDispatch();
  const handleSave = React.useCallback(
    ({textInternal, textPublic}: {textInternal: string | OverruleStatus; textPublic: string | OverruleStatus}) => {
      dispatch(
        overruleStandardResult({
          surveyId,
          standardId,
          status: data?.status?.toLowerCase().includes('passed')
            ? ('Failed - Overruled' as OverruleStatus)
            : ('Passed - Overruled' as OverruleStatus),
          commentText: textPublic || textInternal,
          time: format(Date.now(), 'dd.MM.yy, HH:mm'),
        }),
      );
    },
    [dispatch, standardId, surveyId, data],
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
          validationMessage={t('Fill comment and choose a status')}
          titleText={t('Overrule result') ?? undefined}
          defaultTextInternal={data?.overruleComment?.value ?? null}
          defaultTextPublic={data?.overruleComment?.value ?? null}
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
