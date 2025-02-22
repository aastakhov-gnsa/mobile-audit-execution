import React from 'react';
import {Button} from 'react-native-paper';
import {Secrets} from '../utils/encryptedStorage/encryptedStorage';
import {Storage} from '../utils/storage/storage';
import {logout} from '../features/Auth/authReducer';
import {AuthContext} from '../context/AuthContext';
import {useDispatch} from '../utils/store/configureStore';
import {StyleSheet} from 'react-native';
import {surveyApi} from '../features/Survey/surveyService';
import {useTranslation} from 'react-i18next';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {REDIRECT_URL} from '../../config';
import Config from 'react-native-config';

function LogoutButton({cb}: {cb?: () => void}) {
  const authContext = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const doSignOff = React.useCallback(async () => {
    cb?.();
    authContext.setInProgress(true);
    try {
      if (authContext.gnsaToken) {
        let res;
        if (await InAppBrowser.isAvailable()) {
          res = await InAppBrowser.openAuth(
            `${Config.AUTH_URL}/idp/startSLO.ping`,
            REDIRECT_URL,
          );
        }
        console.log('res', res);
        authContext.setRefreshToken('');
        authContext.setGnsaToken('');
        await Secrets.clearSecrets();
        await Storage.clearStorage();
        authContext.setInProgress(false);
        dispatch(logout());
        dispatch(surveyApi.util.resetApiState());
      }
    } catch (error) {
      console.error('sing off error::', error);
      authContext.setInProgress(false);
    }
  }, [authContext, cb, dispatch]);
  const {t} = useTranslation();
  return (
    <Button
      onPress={doSignOff}
      style={styles.logOutButton}
      icon="logout-variant"
      mode="contained">
      {t('log out')}
    </Button>
  );
}

export default React.memo(LogoutButton);

const styles = StyleSheet.create({
  logOutButton: {
    borderRadius: 0,
  },
});
