import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScreenNames} from '../../../navigation/navigation';
import Typography from '../../../components/Typography';
import {noDataIndex} from '../../../constants/constants';
import ItemWrapper from '../../../components/ItemWrapper';
import {useNavigation} from '@react-navigation/native';
import {NavigationParams} from '../../../interfaces/navigation';
import {useSelector} from '../../../utils/store/configureStore';
import {Status} from '../../../interfaces/common';
import useCurrentLanguage from '../../../hooks/useCurrentLanguage';
import useStandardData from '../../../hooks/useStandardData';

interface NavigationBetweenStandardsProps {
  surveyId: string;
  standardId: string;
}
function NavigationBetweenStandards({
  standardId,
  surveyId,
}: NavigationBetweenStandardsProps) {
  const navigation = useNavigation<NavigationParams>();
  const [langCode, needTranslation] = useCurrentLanguage();
  const standardData = useStandardData(surveyId, standardId);
  const {previousStandard, currentStandard, nextStandard} = useSelector(
    state => {
      const audit = state.evaluation[surveyId];
      const data = audit?.standards;
      const index = data.findIndex(i => i.id === standardId) ?? noDataIndex;
      const prevStandard = data[index - 1];
      const curStandard = data[0];
      const nxtStandard = data[index + 1];
      const dataLength = data.length;
      return {
        previousStandard: index > 0 && {
          index: index - 1,
          id: prevStandard.id,
          name: prevStandard.standardName,
          nameTranslations: prevStandard.nameTranslations,
          status: prevStandard.status,
        },
        currentStandard: dataLength && {
          index: index,
          checkpoint: curStandard.checkpoint,
          auditNumber: audit.auditNumber,
        },
        nextStandard: dataLength &&
          index < dataLength - 1 && {
            index: index + 1,
            id: nxtStandard.id,
            name: nxtStandard.standardName,
            nameTranslations: nxtStandard.nameTranslations,
            status: nxtStandard.status,
          },
      };
    },
  );
  const handlePrev = React.useCallback(() => {
    if (previousStandard) {
      navigation.navigate(ScreenNames.SurveyExecution, {
        surveyId: surveyId,
        standardId: previousStandard.id,
      });
    }
  }, [navigation, previousStandard, surveyId]);
  const handleNext = React.useCallback(() => {
    if (nextStandard) {
      navigation.navigate(ScreenNames.SurveyExecution, {
        surveyId: surveyId,
        standardId: nextStandard.id,
      });
    }
  }, [navigation, nextStandard, surveyId]);

  return (
    <>
      <View style={styles.standardsNavigation}>
        <View>
          {previousStandard && (
            <TouchableOpacity onPress={handlePrev} style={styles.leftTouchable}>
              <Typography size="Body 1">〈</Typography>
              <Typography size="Body 1" numberOfLines={1} style={styles.label}>
                {needTranslation &&
                previousStandard.nameTranslations?.[langCode]
                  ? previousStandard.nameTranslations?.[langCode]
                  : previousStandard.name}
              </Typography>
              <Typography size="Body 1">
                {getGlyph(previousStandard.status)}
              </Typography>
            </TouchableOpacity>
          )}
        </View>

        {nextStandard && (
          <View>
            <TouchableOpacity
              style={styles.rightTouchable}
              onPress={handleNext}>
              <Typography size="Body 1">
                {getGlyph(nextStandard.status)}
              </Typography>
              <Typography size="Body 1" numberOfLines={1} style={styles.label}>
                {needTranslation && nextStandard.nameTranslations?.[langCode]
                  ? nextStandard.nameTranslations?.[langCode]
                  : nextStandard.name}
              </Typography>
              <Typography size="Body 1">〉</Typography>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.currentStandard}>
        {currentStandard && (
          <View>
            <ItemWrapper>
              <Typography size="Body 1" numberOfLines={1}>
                {standardData?.checkpoint}
                {currentStandard?.auditNumber
                  ? ' (' + currentStandard?.auditNumber + ')'
                  : ' ( -- )'}
              </Typography>
            </ItemWrapper>
          </View>
        )}
      </View>
    </>
  );
}

export default React.memo(NavigationBetweenStandards);

const styles = StyleSheet.create({
  standardsNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  currentStandard: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    marginBottom: 10,
  },
  leftTouchable: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightTouchable: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  label: {maxWidth: '93%'},
});

function getGlyph(status?: Status) {
  switch (status?.toLowerCase()) {
    case 'passed':
    case 'passed - overruled':
    case 'completed': {
      return '✓';
    }
    case 'failed - overruled':
    case 'failed': {
      return '✗';
    }
    default: {
      return '';
    }
  }
}
