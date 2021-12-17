import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Typography from './Typography';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ICON_SIZE} from '../constants/constants';
import {ScreenNames} from '../navigation/navigation';
import {useNavigation} from '@react-navigation/native';
import {NavigationParams} from '../interfaces/navigation';
import {useTranslation} from 'react-i18next';

function UserInfo({fullName, cb}: {fullName: string; cb?: () => void}) {
  const navigation = useNavigation<NavigationParams>();
  const openLegalNotices = React.useCallback(() => {
    cb?.();
    navigation.navigate(ScreenNames.LegalNoticesAndTerms);
  }, [cb, navigation]);
  const {t} = useTranslation();
  return (
    <View style={styles.info}>
      <View style={styles.userLabel}>
        <Typography size="Headline 6">{fullName}</Typography>
      </View>
      <Divider />
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={openLegalNotices}>
          <Typography size="Body 1">{t('Legal Notices and Terms')}</Typography>
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
