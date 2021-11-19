import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ICON_SIZE} from '../constants/constants';
import Typography, {TypographyProps} from './Typography';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';

interface TouchableTextProps extends Omit<TypographyProps, 'onPress'> {
  iconName?: string;
  onPress?: () => void;
}

function TouchableText({iconName, onPress, ...rest}: TouchableTextProps) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {iconName && (
        <Icon
          name={iconName}
          size={ICON_SIZE}
          color={colors.primary}
          style={styles.icon}
        />
      )}
      <Typography {...rest} style={styles.text}>
        {rest.children}
      </Typography>
    </TouchableOpacity>
  );
}

export default React.memo(TouchableText);

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: 8,
    },
    text: {
      color: colors.primary,
    },
  });
