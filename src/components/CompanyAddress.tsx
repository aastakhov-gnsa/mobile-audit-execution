import React from 'react';
import {StyleSheet} from 'react-native';
import Typography from './Typography';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';
import NoDataFallback from './NoDataFallback';
import {Portal, Snackbar, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {ICON_SIZE} from '../constants/constants';

interface CompanyAddressProps {
  outletAddress?: string;
  companyId?: string;
  outletId?: string;
  legalName?: string;
  copyable?: boolean;
}

function CompanyAddress({
  outletAddress,
  companyId,
  outletId,
  legalName,
  copyable,
}: CompanyAddressProps) {
  const [visible, setVisible] = React.useState(false);
  const handleCopy = React.useCallback(() => {
    Clipboard.setString(outletAddress ?? '');
    setVisible(true);
  }, [outletAddress]);
  const handleVisible = React.useCallback(
    () => setVisible(!visible),
    [visible],
  );
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {t} = useTranslation();
  if (!outletAddress && !companyId) {
    return <NoDataFallback />;
  }
  return (
    <>
      <Typography size="Body 1">{`${companyId}/${outletId} : ${legalName}, ${outletAddress}`}</Typography>
      {outletAddress && copyable && (
        <TouchableOpacity onPress={handleCopy}>
          <Typography size="Body 1" style={styles.link}>
            {t('Copy the Address')}
          </Typography>
        </TouchableOpacity>
      )}
      <Portal>
        <Snackbar visible={visible} onDismiss={handleVisible} duration={2000}>
          {/*todo styles are needed*/}
          {/*<Icon name="content-copy" size={ICON_SIZE} />*/}
          <Typography size="Body 2">
            {t('Address copied to clipboard')}
          </Typography>
        </Snackbar>
      </Portal>
    </>
  );
}

export default React.memo(CompanyAddress);

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    link: {
      marginTop: 4,
      color: colors.primary,
    },
  });
