import React from 'react';
import {StyleSheet} from 'react-native';
import themeConfig from '../../../themeConfig';
import HeaderControlsContainer from '../HeaderControlsContainer';
import Help from './components/Help';
import ContentLanguageSwitcher from '../../features/ContentLanguageSwitching/ContentLanguageSwitcher';

function HeaderRight() {
  return (
    <HeaderControlsContainer>
      <Help style={helpIconStyle} />
      <ContentLanguageSwitcher iconStyle={styles.icon} />
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
