import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import themeConfig from '../../../themeConfig';
import {ICON_SIZE} from '../../constants/constants';
import UserAvatar from './components/UserAvatar';
import Help from './components/Help';

function HeaderRight() {
  return (
    <View style={styles.container}>
      <Help style={styles.icon} />
      {/*todo implement language switching*/}
      <Icon name="translate" size={ICON_SIZE} style={styles.icon} />
      <UserAvatar />
    </View>
  );
}

export default React.memo(HeaderRight);

const styles = StyleSheet.create({
  icon: {
    color: themeConfig.darkTheme.colors.text,
    marginRight: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
});
