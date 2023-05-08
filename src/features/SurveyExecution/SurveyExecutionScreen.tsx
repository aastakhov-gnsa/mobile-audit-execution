import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import Typography from '../../components/Typography';
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
import {useSelector} from '../../utils/store/configureStore';
import {shallowEqual} from 'react-redux';
import AddComment from './components/AddComment';
import OverruleResult from './components/OverruleResult';
import {useTranslation} from 'react-i18next';
import {HeaderBackButton} from '@react-navigation/elements';

export default function SurveyExecutionScreen() {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation<NavigationParams>();
  const route = useRoute<SurveyExecutionRouteParams>();
  const {surveyId, standardId} = route.params;
  const {standardLength, standardIndex, standardData, surveyNumber} =
    useSelector(state => {
      const data = state.evaluation[surveyId].standards;
      const index = data?.findIndex(i => i.id === standardId) ?? noDataIndex;
      const dataLength = data?.length;
      const sNumber = state.evaluation[surveyId].number;
      return {
        standardLength: dataLength,
        standardIndex: index > noDataIndex && index + 1,
        standardData: index > noDataIndex ? data![index] : undefined,
        surveyNumber: sNumber,
      };
    }, shallowEqual);
  const {t} = useTranslation();
  React.useEffect(() => {
    navigation.setOptions({
      title: (
        <Typography size="Headline 6">
          {t('Evaluation')} - {standardIndex} {t('of')} {standardLength}
        </Typography>
      ),
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={true}
          label={surveyNumber}
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: () => <EvaluationHeaderRight surveyId={surveyId} />,
    });
  }, [navigation, standardLength, standardIndex, surveyId, t, surveyNumber]);
  if (!surveyId) {
    return null;
  }
  const overruled = standardData?.status?.toLowerCase().includes('overruled');
  return (
    <ScreenContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={themeConfig.defaultTheme.colors.surface}
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
          <AddComment
            surveyId={surveyId}
            standardId={standardId}
            internalComment={standardData?.internalComment!}
            publicComment={standardData?.publicComment!}
          />
          <OverruleResult surveyId={surveyId} standardId={standardId} />
        </ItemWrapper>
        {standardData?.questionDTOList?.map((item, index) => (
          <StandardQuestion
            disabled={overruled}
            surveyId={surveyId}
            standardId={standardId}
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
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
