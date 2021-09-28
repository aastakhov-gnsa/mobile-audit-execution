import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScreenNames} from '../../../navigation/navigation';
import Typography from '../../../components/Typography';
import {surveyApi} from '../../Survey/surveyService';
import {noDataIndex} from '../../../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {NavigationParams} from '../../../interfaces/navigation';

interface NavigationBetweenStandardsProps {
  surveyId: string;
  standardId: string;
}
function NavigationBetweenStandards({
  standardId,
  surveyId,
}: NavigationBetweenStandardsProps) {
  const navigation = useNavigation<NavigationParams>();

  const {previousStandard, nextStandard} =
    surveyApi.endpoints.survey.useQueryState(surveyId, {
      selectFromResult: result => {
        const index =
          result.data?.findIndex(i => i.id === standardId) ?? noDataIndex;
        const dataLength = result.data?.length;
        return {
          previousStandard: index > 0 && {
            index: index - 1,
            id: result.data![index - 1].id,
            name: result.data![index - 1].standardName,
          },
          nextStandard: dataLength &&
            index < dataLength - 1 && {
              index: index + 1,
              id: result.data![index + 1].id,
              name: result.data![index + 1].standardName,
            },
        };
      },
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
            <Typography size="Body 1">〈 {previousStandard.name}</Typography>
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
            <Typography size="Body 1">{nextStandard.name} 〉</Typography>
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
    marginBottom: 40,
  },
  navigationLeft: {
    marginLeft: -10,
  },
  navigationRight: {
    marginRight: -10,
  },
});
