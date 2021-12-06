import React from 'react';
import {useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Typography from './Typography';
import {Status} from '../interfaces/common';
import {useTranslation} from 'react-i18next';

interface StatusWithIconProps {
  status?: Status;
}
function StatusWithIcon({status}: StatusWithIconProps) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  if (!status) {
    return null;
  }
  return (
    <View style={styles.statusContainer}>
      {getStatusIcon(status)}
      <Typography size="Body 1" style={textStyle(colors)}>
        {t(status)}
      </Typography>
    </View>
  );
}

export default React.memo(StatusWithIcon);

const styles = StyleSheet.create({
  icon: {
    fontSize: 16,
    marginRight: 12,
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const textStyle = (colors: ReactNativePaper.ThemeColors) => ({
  color: colors.text50,
});

function getStatusIcon(v: string) {
  switch (v?.toLowerCase()) {
    case 'passed':
    case 'passed - overruled':
    case 'completed': {
      return <Icon name="check" color="#25B220" style={styles.icon} />;
    }
    case 'in progress':
    case 'open': {
      return <Icon name="clockcircleo" color="#FCB814" style={styles.icon} />;
    }
    case 'failed - overruled':
    case 'failed': {
      return <Icon name="close" color="#FD6464" style={styles.icon} />;
    }
    default: {
      return <Icon name="question" />;
    }
  }
}
