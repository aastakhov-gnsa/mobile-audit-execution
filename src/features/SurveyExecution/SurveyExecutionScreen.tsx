import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import Typography from '../../components/Typography';
import {surveyApi} from '../Survey/surveyService';
import {ScrollView} from 'react-native-gesture-handler';
import {StatusBar, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import StandardQuestion from './components/StandardQuestion';
import ScreenContainer from '../../components/ScreenContainer';
import ItemWrapper from '../../components/ItemWrapper';
import {noDataIndex} from '../../constants/constants';
import StandardInformation from './components/StandardInformation';
import NavigationBetweenStandards from './components/NavigationBetweenStandards';
import {
  NavigationParams,
  SurveyExecutionRouteParams,
} from '../../interfaces/navigation';
import themeConfig from '../../../themeConfig';
import EvaluationHeaderRight from '../../components/HeaderRight/EvaluationHeaderRight';

export default function SurveyExecutionScreen() {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation<NavigationParams>();
  const route = useRoute<SurveyExecutionRouteParams>();
  const {surveyId, standardId} = route.params;
  const {standardData, standardLength, standardIndex} =
    surveyApi.endpoints.survey.useQueryState(surveyId, {
      selectFromResult: result => {
        const index =
          result.data?.findIndex(i => i.id === standardId) ?? noDataIndex;
        const dataLength = result.data?.length;
        return {
          standardLength: dataLength,
          standardIndex: index > noDataIndex && index + 1,
          standardData: index > noDataIndex ? result.data![index] : undefined,
        };
      },
    });
  React.useEffect(() => {
    navigation.setOptions({
      title: (
        <Typography size="Headline 6">
          Evaluation - {standardIndex} of {standardLength}
        </Typography>
      ),
      headerRight: () => <EvaluationHeaderRight surveyId={surveyId} />,
    });
  }, [navigation, standardLength, standardIndex, surveyId]);
  if (!surveyId) {
    return null;
  }
  return (
    <ScreenContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={themeConfig.defaultTheme.colors.onSurface}
      />
      <ScrollView>
        <NavigationBetweenStandards
          standardId={standardId}
          surveyId={surveyId}
        />
        <ItemWrapper paddingValue={[0, 38]}>
          <StandardInformation surveyId={surveyId} id={standardId} />
        </ItemWrapper>
        <ItemWrapper style={styles.controls} paddingValue={[0, 30]}>
          <Typography size="Button" style={styles.button}>
            EXTERNAL COMMENT
          </Typography>
          <Typography size="Button" style={styles.button}>
            CHANGE RESULT
          </Typography>
        </ItemWrapper>
        {standardData?.questionDTOList?.map((item, index) => (
          <StandardQuestion
            question={item}
            key={item.id}
            questionIndex={index}
            total={standardData?.questionDTOList!.length}
          />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
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
    button: {
      color: colors.primary,
    },
    controls: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
