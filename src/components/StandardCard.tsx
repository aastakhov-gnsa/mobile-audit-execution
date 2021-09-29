import React from 'react';
import {Card, Chip, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import Typography from './Typography';
import StatusWithIcon from './StatusWithIcon';
import Services from './Services';
import Checkpoint from './Checkpoint';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../navigation/navigation';
import {NavigationParams} from '../interfaces/navigation';
import useStandardData from '../hooks/useStandardData';

interface StandardCardProps {
  id: string;
  surveyId: string;
}

function StandardCard({id, surveyId}: StandardCardProps) {
  const navigation = useNavigation<NavigationParams>();
  const data = useStandardData(surveyId, id);
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <Card
      style={styles.card}
      onPress={() =>
        navigation.navigate(ScreenNames.SurveyExecution, {
          surveyId: surveyId,
          standardId: id,
        })
      }>
      <Card.Title
        title={
          <Typography size="Body 1" style={styles.titleText}>
            {data?.standardName}
          </Typography>
        }
        subtitle={<Typography size="Body 1">{data?.standardNumber}</Typography>}
        right={() => <StatusWithIcon status={data?.status} />}
        rightStyle={styles.rightContainer}
      />
      <Card.Content style={styles.cardContent}>
        <Services services={data?.services} showNumber={4} />
        <View style={styles.bottomContainer}>
          <Checkpoint checkpoint={data?.checkpoint} style={styles.bottomItem} />
          <Chip>{data?.standardType}</Chip>
        </View>
      </Card.Content>
    </Card>
  );
}

export default React.memo(StandardCard);

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    cardContent: {
      marginTop: 10,
    },
    titleText: {
      fontFamily: 'Roboto-Medium',
    },
    card: {
      borderWidth: 1,
      borderColor: colors.onBackground20,
      marginBottom: '2%',
    },
    rightContainer: {
      paddingRight: 16,
    },
    bottomContainer: {
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomItem: {
      marginRight: 20,
    },
  });
