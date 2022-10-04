import React, {useEffect} from 'react';
import {authorize} from 'react-native-app-auth';
import {AUTH_CONFIG} from '../../../config';
import {Image, StyleSheet, View} from 'react-native';
import Page from './components/Page';
import Spinner from './components/Spinner';
import {Button} from 'react-native-paper';
import {
  SecretItems,
  Secrets,
} from '../../utils/encryptedStorage/encryptedStorage';
import {AuthContext} from '../../context/AuthContext';
import {API, sendAuthorizationCode} from '../../api/api';
import {Storage, StorageItems} from '../../utils/storage/storage';
import {useDispatch, useSelector} from '../../utils/store/configureStore';
import Typography from '../../components/Typography';
import {useTranslation} from 'react-i18next';
import {parseJwt} from '../../utils/jwt';
import {setAuthTokens} from './authReducer';
import {alert} from '../../api/apiAlerts';
const image = require('./assets/logo.png');

function AuthScreen() {
  const authContext = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const {tokenLoading} = useSelector(store => store.tokenUtil);
  const {token} = useSelector(store => store.auth);
  const [newToken, setNewToken] = React.useState('');
  useEffect(() => {
    const setToken = async () => {
      if (newToken) {
        await Secrets.saveSecret(SecretItems.gnsaToken, newToken);
        authContext.setGnsaToken(newToken);
      }
    };
    setToken();
  }, [newToken, authContext]);

  const doAuthorize = React.useCallback(async () => {
    console.log('doAuthorize press');
    authContext.setInProgress(true);
    try {
      // SSO: auth
      const authorizationCodeResponse = await authorize(AUTH_CONFIG);
      const accessTokenResponse = await sendAuthorizationCode(
        authorizationCodeResponse.authorizationCode,
      );
      const {jwttoken, refreshToken, givenName, familyName} =
        accessTokenResponse.data;
      setNewToken(jwttoken);
      await Secrets.saveSecret(SecretItems.gnsaToken, jwttoken);
      await Storage.saveItem(StorageItems.firstName, givenName);
      await Storage.saveItem(StorageItems.lastName, familyName);
      const {sub} = parseJwt(jwttoken);
      await Storage.saveItem(StorageItems.userName, sub);
      await Storage.saveItem(
        StorageItems.fullName,
        `${givenName} ${familyName}`,
      );

      authContext.setRefreshToken(refreshToken);
      dispatch(setAuthTokens({token: jwttoken, refreshToken}));
    } catch (error) {
      console.error('Authentication failed', JSON.stringify(error));
      alert(error);
    }
    authContext.setInProgress(false);
  }, [authContext, dispatch]);

  const {t} = useTranslation();
  return (
    <Page>
      <Spinner inProgress={authContext.inProgress || tokenLoading} />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image source={image} style={styles.logo} />
          <View style={styles.welcomeWrapper}>
            <Typography size="Headline 5" style={styles.text}>
              {t('Welcome to the new audit app')}!
            </Typography>
            <Typography size="Subtitle 2" style={styles.text}>
              {t('Authorize to get started')}
            </Typography>
          </View>
          <Button onPress={doAuthorize} mode="contained" style={styles.button}>
            {t('Sign in')}
          </Button>
        </View>
      </View>
    </Page>
  );
}

export default React.memo(AuthScreen);

const styles = StyleSheet.create({
  button: {width: 201},
  welcomeWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 60,
    width: 290,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    height: 280,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
  },
});
