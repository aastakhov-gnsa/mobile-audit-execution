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
import {API} from '../../api/api';
import {Storage, StorageItems} from '../../utils/storage/storage';
import {fetchGnsaToken} from './authActions';
import {useDispatch, useSelector} from '../../utils/store/configureStore';
import Typography from '../../components/Typography';
const image = require('./assets/logo.png');

function AuthScreen() {
  const authContext = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const token = useSelector(store => store.auth.token);
  useEffect(() => {
    const setToken = async () => {
      if (token) {
        await Secrets.saveSecret(SecretItems.gnsaToken, token);
        authContext.setGnsaToken(token);
      }
    };
    setToken();
  }, [token, authContext]);

  const doAuthorize = React.useCallback(async () => {
    authContext.setInProgress(true);
    try {
      // SSO: auth
      const authState = await authorize(AUTH_CONFIG);
      // console.log('-->', JSON.stringify(authState, null, 2));
      await Secrets.saveSecret(SecretItems.accessToken, authState.accessToken);
      await Secrets.saveSecret(SecretItems.idToken, authState.idToken);

      // SSO: retrieve user info
      const userInfo = await API.getUserInfo(authState.accessToken);
      const {
        data: {sub},
      } = userInfo;
      await Storage.saveItem(StorageItems.userName, sub);
      // console.log('userInfo', userInfo);
      authContext.setAccessToken(authState.accessToken);
      authContext.setIdToken(authState.idToken);
      // fixme current gnsa integration hack
      dispatch(fetchGnsaToken(sub));
      // console.log('gnsaRes', gnsaRes);

      // end of authorization
      authContext.setInProgress(false);
    } catch (error) {
      console.error(error);
      authContext.setInProgress(false);
    }
  }, [authContext, dispatch]);

  return (
    <Page>
      <Spinner inProgress={authContext.inProgress} />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image source={image} style={styles.logo} />
          <View style={styles.welcomeWrapper}>
            <Typography size="Headline 5" style={styles.text}>
              Welcome to the new audit app!
            </Typography>
            <Typography size="Subtitle 2" style={styles.text}>
              Authorize to get started
            </Typography>
          </View>
          <Button onPress={doAuthorize} mode="contained" style={styles.button}>
            Sign On
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapper: {
    marginBottom: '50%',
    height: 280,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
  },
});
