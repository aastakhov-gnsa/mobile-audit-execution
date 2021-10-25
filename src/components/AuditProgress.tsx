import React from 'react';
import {StyleSheet} from 'react-native';
import {ProgressBar, useTheme} from 'react-native-paper';
import Typography from './Typography';
import ItemWrapper from './ItemWrapper';
import {useSelector} from '../utils/store/configureStore';
import {Status} from '../interfaces/common';

interface AuditProgressProps {
  surveyId: string;
}

const completedStatus: Status[] = [
  'Passed',
  'Failed',
  'Passed - Overruled',
  'Failed - Overruled',
];

function AuditProgress({surveyId}: AuditProgressProps) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const standards = useSelector(state => state.evaluation[surveyId]?.standards);
  const completed = standards?.reduce(
    (acc, current) =>
      current?.status && completedStatus.includes(current?.status)
        ? acc + 1
        : acc,
    0,
  );
  const all = standards?.length;
  return (
    <>
      <ItemWrapper paddingValue={[0, 14]}>
        <ProgressBar
          color={colors.primary}
          style={styles.bar}
          progress={completed / all}
        />
      </ItemWrapper>
      <Typography size="Body 1">
        {completed} of {all}
      </Typography>
    </>
  );
}

export default React.memo(AuditProgress);

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    bar: {
      height: 27,
      backgroundColor: colors.onBackground10,
    },
  });
