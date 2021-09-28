import React from 'react';
import {StyleSheet, View} from 'react-native';
import Typography from './Typography';
import {Divider} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ICON_SIZE} from '../constants/constants';
import {ScreenNames} from '../navigation/navigation';
import {useNavigation} from '@react-navigation/native';
import {NavigationParams} from '../interfaces/navigation';

function UserInfo({fullName}: {fullName: string}) {
  const navigation = useNavigation<NavigationParams>();
  const openLegalNotices = React.useCallback(() => {
    navigation.navigate(ScreenNames.LegalNoticesAndTerms);
  }, [navigation]);
  return (
    <View style={styles.info}>
      <View style={styles.userLabel}>
        <Typography size="Headline 6">{fullName}</Typography>
      </View>
      <Divider />
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={openLegalNotices}>
          <Typography size="Body 1">Legal Notices and Terms</Typography>
          <Icon name="content-paste" size={ICON_SIZE} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(UserInfo);

const styles = StyleSheet.create({
  userLabel: {
    width: 290,
    padding: 16,
  },
  menu: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  menuItem: {
    paddingTop: 12,
    paddingRight: 14,
    paddingBottom: 12,
    paddingLeft: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    backgroundColor: 'white',
  },
});
