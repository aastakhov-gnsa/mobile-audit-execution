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
import {Divider, Text} from 'react-native-paper';
import themeConfig from '../../../../themeConfig';
import {ScreenNames} from '../../../navigation/navigation';
import {useNavigation} from '@react-navigation/native';
import {
  NavigationParams,
  SurveysStackParamList,
} from '../../../interfaces/navigation';
import {useTranslation} from 'react-i18next';
import Typography from '../../Typography';
import packageJson from '../../../../package.json';

interface HelpProps {
  style?: StyleProp<TextStyle>;
}
const helpMenu: Array<{
  label: string;
  screenName: keyof SurveysStackParamList;
}> = [
  {
    label: 'User Manual',
    screenName: ScreenNames.UserManual,
  },
];
function Help({style}: HelpProps) {
  const navigation = useNavigation<NavigationParams>();
  const [visible, setVisible] = React.useState(false);
  const handleVisible = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  const createNavigationHandler = React.useCallback(
    (name: keyof SurveysStackParamList) => () => {
      handleVisible();
      navigation.navigate(name);
    },
    [handleVisible, navigation],
  );
  const {t} = useTranslation();
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
              <Text>{t(i.label)}</Text>
            </TouchableOpacity>
          ))}
          <Divider />
          <View style={styles.version}>
            <Typography size="Overline">v {packageJson.version}</Typography>
          </View>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  version: {
    alignItems: 'center',
    paddingTop: 1,
    paddingBottom: 1,
  },
});
