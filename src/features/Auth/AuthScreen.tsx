import React from 'react';
import {authorize} from 'react-native-app-auth';
import {AUTH_CONFIG} from '../../../config';
import {StyleSheet, View} from 'react-native';
import Page from './components/Page';
import Spinner from './components/Spinner';
import {Button, Headline, Title} from 'react-native-paper';
import {
  SecretItems,
  Secrets,
} from '../../utils/encryptedStorage/encryptedStorage';
import {AuthContext} from '../../context/AuthContext';
import {API} from '../../api/api';
import {Storage, StorageItems} from '../../utils/storage/storage';

function AuthScreen() {
  const authContext = React.useContext(AuthContext);

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
      const gnsaRes = await API.gnsaAuth(sub);
      const {
        data: {token},
      } = gnsaRes;
      // console.log('gnsaRes', gnsaRes);
      await Secrets.saveSecret(SecretItems.gnsaToken, token);
      authContext.setGnsaToken(token);

      // end of authorization
      authContext.setInProgress(false);
    } catch (error) {
      console.error(error);
      authContext.setInProgress(false);
    }
  }, [authContext]);

  return (
    <Page>
      <Spinner inProgress={authContext.inProgress} />
      <View style={styles.container}>
        <Headline style={styles.text}>
          You are not currently authenticated.
        </Headline>
        <Title style={styles.text}>Click Sign On to get started.</Title>
      </View>
      <Button onPress={doAuthorize} mode="contained">
        Sign On
      </Button>
    </Page>
  );
}

export default React.memo(AuthScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});
