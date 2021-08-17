import React, {useEffect} from 'react';
import {authorize} from 'react-native-app-auth';
import {AUTH_CONFIG} from '../../../config';
import {Image, StyleSheet, View} from 'react-native';
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
import {fetchGnsaToken} from './authActions';
import {useDispatch, useSelector} from '../../utils/store/configureStore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {Navigation} from '../../navigation/navigation';
const image = require('./assets/logo.png');

interface AuthScreenProps {
  navigation: Navigation;
}

function AuthScreen({navigation}: AuthScreenProps) {
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
          <Image
            source={image}
            style={{
              height: 60,
              width: 290,
              resizeMode: 'contain',
            }}
          />
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Headline style={styles.text}>
              Welcome to the new audit app!
            </Headline>
            <Title style={styles.text}>Authorize to get started</Title>
          </View>
          <Button onPress={doAuthorize} mode="contained" style={{width: 201}}>
            Sign On
          </Button>
        </View>
        <TouchableOpacity
          style={styles.disclaimer}
          onPress={() => navigation.navigate('LegalNoticesAndTerms')}>
          <Title style={disclaimerLabelStyle}>Legal Notices and Terms</Title>
          <Icon style={styles.text} name="caretup" />
        </TouchableOpacity>
      </View>
    </Page>
  );
}

export default React.memo(AuthScreen);

const styles = StyleSheet.create({
  logo: {
    height: 60,
    width: 290,
    resizeMode: 'contain',
  },
  disclaimer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
  mr: {
    marginRight: 10,
  },
});

const disclaimerLabelStyle = StyleSheet.flatten([styles.text, styles.mr]);
