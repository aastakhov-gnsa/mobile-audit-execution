import React from 'react';
import {Button as PaterButton, useTheme} from 'react-native-paper';
import {IconSource} from 'react-native-paper/src/components/Icon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ICON_SIZE} from '../constants/constants';
import {StyleSheet} from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  icon?: IconSource;
}

function Button({children, icon, onPress}: ButtonProps) {
  const {colors} = useTheme();

  const props: {
    icon?: IconSource;
  } = {};
  if (icon && typeof icon === 'string') {
    const iconProp = () => (
      <Icon
        name={icon}
        size={ICON_SIZE}
        color={colors.primary}
        style={styles.buttonIcon}
      />
    );
    props.icon = iconProp;
  }
  if (icon && typeof icon !== 'string') {
    props.icon = icon;
  }
  return (
    <PaterButton onPress={onPress} {...props}>
      {children}
    </PaterButton>
  );
}

export default React.memo(Button);

const styles = StyleSheet.create({
  buttonIcon: {
    marginRight: -8,
  },
});
