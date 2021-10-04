import React from 'react';
import {RefreshControlProps, StyleSheet} from 'react-native';
import Typography from './Typography';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';

interface NoSurveysProps {
  refreshControl: React.ReactElement<RefreshControlProps>;
}

function NoSurveys({refreshControl}: NoSurveysProps) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={refreshControl}>
      <Typography size="Headline 1" style={styles.emo}>
        📭
      </Typography>
      <Typography size="Headline 6" style={styles.header}>
        There are no new surveys at the moment
      </Typography>
      <Typography size="Body 1" style={styles.hint}>
        Pull down the screen to refresh the list
      </Typography>
    </ScrollView>
  );
}

export default React.memo(NoSurveys);

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    emo: {marginTop: '50%'},
    header: {
      marginTop: 16,
    },
    hint: {
      marginTop: 16,
      color: colors.text50,
    },
  });
