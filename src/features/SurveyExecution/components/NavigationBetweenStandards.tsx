import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScreenNames} from '../../../navigation/navigation';
import Typography from '../../../components/Typography';
import {noDataIndex} from '../../../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {NavigationParams} from '../../../interfaces/navigation';
import {useSelector} from '../../../utils/store/configureStore';
import {Status} from '../../../interfaces/common';

interface NavigationBetweenStandardsProps {
  surveyId: string;
  standardId: string;
}
function NavigationBetweenStandards({
  standardId,
  surveyId,
}: NavigationBetweenStandardsProps) {
  const navigation = useNavigation<NavigationParams>();

  const {previousStandard, nextStandard} = useSelector(state => {
    const data = state.evaluation[surveyId].standards;
    const index = data?.findIndex(i => i.id === standardId) ?? noDataIndex;
    const prevStandard = data![index - 1];
    const nxtStandard = data![index + 1];
    const dataLength = data?.length;
    return {
      previousStandard: index > 0 && {
        index: index - 1,
        id: prevStandard.id,
        name: prevStandard.standardName,
        status: prevStandard.status,
      },
      nextStandard: dataLength &&
        index < dataLength - 1 && {
          index: index + 1,
          id: nxtStandard.id,
          name: nxtStandard.standardName,
          status: nxtStandard.status,
        },
    };
  });
  return (
    <View style={styles.standardsNavigation}>
      <View style={styles.navigationLeft}>
        {previousStandard && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ScreenNames.SurveyExecution, {
                surveyId: surveyId,
                standardId: previousStandard.id,
              })
            }>
            <Typography size="Body 1">
              〈 {previousStandard.name} {getGlyph(previousStandard.status)}
            </Typography>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.navigationRight}>
        {nextStandard && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ScreenNames.SurveyExecution, {
                surveyId: surveyId,
                standardId: nextStandard.id,
              })
            }>
            <Typography size="Body 1">
              {getGlyph(nextStandard.status)} {nextStandard.name} 〉
            </Typography>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default React.memo(NavigationBetweenStandards);

const styles = StyleSheet.create({
  standardsNavigation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 40,
  },
  navigationLeft: {
    marginLeft: -10,
  },
  navigationRight: {
    marginRight: -10,
  },
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
