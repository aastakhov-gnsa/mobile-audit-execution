import React from 'react';
import {authorize} from 'react-native-app-auth';
import {AUTH_CONFIG} from '../../config';
import {View, StyleSheet} from 'react-native';
import Page from './components/Page';
import Spinner from './components/Spinner';
import {Button, Title, Headline} from 'react-native-paper';

function Auth() {
  // const [orientation, setOrientation] = React.useState('portrait');
  const [accessToken, setAccessToken] = React.useState('');
  const [idToken, setIdToken] = React.useState('');
  // const [idTokenJSON, setIdTokenJSON] = React.useState(null);
  // const [authStateParam, setAuthStateParam] = React.useState(null);
  // const [userInfo, setUserInfo] = React.useState(null)
  const [inProgress, setInProgress] = React.useState(false);

  const doAuthorize = React.useCallback(async () => {
    setInProgress(true);
    try {
      const authState = await authorize(AUTH_CONFIG);
      console.log('-->', JSON.stringify(authState, null, 2));
      setAccessToken(authState.accessToken);
      setIdToken(authState.idToken);
      // setUserInfo(authState)
      setInProgress(false);
    } catch (error) {
      console.error(error);
      setInProgress(false);
    }
  }, []);

  return (
    <Page>
      <Spinner inProgress={inProgress} />
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

export default React.memo(Auth);

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
