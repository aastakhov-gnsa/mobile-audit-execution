import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ICON_SIZE} from '../../../constants/constants';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import Popover from '../../Popover';
import {Text} from 'react-native-paper';
import themeConfig from '../../../../themeConfig';
import {ScreenNames} from '../../../navigation/navigation';
import {useNavigation} from '@react-navigation/native';

interface HelpProps {
  style?: StyleProp<TextStyle>;
}
const helpMenu = [
  {
    label: 'User Manual',
    screenName: ScreenNames.UserManual,
  },
  {
    label: 'Contact Support',
    screenName: ScreenNames.ContactSupport,
  },
];
function Help({style}: HelpProps) {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const handleVisible = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  const createNavigationHandler = React.useCallback(
    (name: string) => () => {
      handleVisible();
      navigation.navigate(name);
    },
    [handleVisible, navigation],
  );
  return (
    <>
      <TouchableOpacity onPress={handleVisible}>
        <Icon name="help-outline" size={ICON_SIZE} style={style} />
      </TouchableOpacity>
      <Popover visible={visible} onDismiss={handleVisible} style={styles.modal}>
        <View style={styles.menu}>
          {helpMenu.map(i => (
            <TouchableOpacity
              key={i.label}
              style={styles.menuItem}
              onPress={createNavigationHandler(i.screenName)}>
              <Text>{i.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Popover>
    </>
  );
}

export default React.memo(Help);

const styles = StyleSheet.create({
  menu: {
    width: 230,
    backgroundColor: themeConfig.defaultTheme.colors.background,
  },
  menuItem: {
    backgroundColor: themeConfig.defaultTheme.colors.background,
    paddingTop: 20,
    paddingRight: 16,
    paddingBottom: 20,
    paddingLeft: 14,
  },
  modal: {
    display: 'flex',
    alignItems: 'flex-end',
    paddingTop: 52,
    paddingRight: 58,
    justifyContent: 'flex-start',
  },
});
