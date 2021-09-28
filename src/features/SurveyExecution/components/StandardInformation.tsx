import React from 'react';
import Typography from '../../../components/Typography';
import ItemWrapper from '../../../components/ItemWrapper';
import Services from '../../../components/Services';
import {StyleSheet, View} from 'react-native';
import Checkpoint from '../../../components/Checkpoint';
import {Chip, useTheme} from 'react-native-paper';
import {surveyApi} from '../../Survey/surveyService';
interface StandardInformationProps {
  id: string;
  surveyId: string;
}
function StandardInformation({id, surveyId}: StandardInformationProps) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {data} = surveyApi.endpoints.survey.useQueryState(surveyId, {
    selectFromResult: result => ({
      data: result.data?.find(i => i.id === id),
    }),
  });

  return (
    <>
      <Typography size="Headline 6" style={styles.header}>
        {data?.standardName}
      </Typography>
      <Typography size="Body 1" style={styles.hint}>
        {data?.standardNumber}
      </Typography>
      <ItemWrapper paddingValue={[24, 24]}>
        <Typography size="Body 1" numberOfLines={2} ellipsizeMode="tail">
          {data?.standardText}
        </Typography>
      </ItemWrapper>
      <ItemWrapper paddingValue={[0, 26]}>
        <Services services={data?.services} showNumber={4} />
      </ItemWrapper>
      <ItemWrapper paddingValue={0}>
        <View style={styles.bottomContainer}>
          <Checkpoint checkpoint={data?.checkpoint} style={styles.bottomItem} />
          <Chip>{data?.standardType}</Chip>
        </View>
      </ItemWrapper>
    </>
  );
}

export default React.memo(StandardInformation);

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    hint: {
      marginTop: 4,
      color: colors.text50,
    },
    header: {
      fontFamily: 'Roboto-Bold',
    },
    bottomContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomItem: {
      marginRight: 20,
    },
  });
