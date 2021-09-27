import React from 'react';
import {Card, Chip, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {surveyApi} from '../features/Survey/surveyService';
import Typography from './Typography';
import StatusWithIcon from './StatusWithIcon';
import Services from './Services';
import Checkpoint from './Checkpoint';

interface StandardCardProps {
  id: string;
  surveyId: string;
}

function StandardCard({id, surveyId}: StandardCardProps) {
  const {data} = surveyApi.endpoints.survey.useQueryState(surveyId, {
    selectFromResult: result => ({
      data: result.data?.find(i => i.id === id),
    }),
  });
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <Card style={styles.card}>
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
