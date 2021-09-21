import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import themeConfig from '../../../themeConfig';
import {ICON_SIZE} from '../../constants/constants';
import HeaderControlsContainer from '../HeaderControlsContainer';
import Help from './components/Help';

function HeaderRight() {
  return (
    <HeaderControlsContainer>
      <Help style={helpIconStyle} />
      {/*todo implement language switching*/}
      <Icon name="translate" size={ICON_SIZE} style={styles.icon} />
    </HeaderControlsContainer>
  );
}

export default React.memo(HeaderRight);

const styles = StyleSheet.create({
  icon: {
    color: themeConfig.darkTheme.colors.text,
  },
});

const helpIconStyle = StyleSheet.flatten([styles.icon, {marginRight: 20}]);
