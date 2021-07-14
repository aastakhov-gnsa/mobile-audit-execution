import React from 'react';
import {authorize} from 'react-native-app-auth';
import {AUTH_CONFIG} from '../../config';
import {View, StyleSheet} from 'react-native';
import Page from './components/Page';
import Spinner from './components/Spinner';
import {Button, Title, Headline} from 'react-native-paper';
import {signOff} from '../authTest/api';

function Auth() {
  const [accessToken, setAccessToken] = React.useState('');
  const [idToken, setIdToken] = React.useState('');
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
  }, [setInProgress, setAccessToken, setIdToken]);

  const doSignOff = React.useCallback(async () => {
    setInProgress(true);
    try {
      if (idToken) {
        const res = await signOff(idToken);
        console.log('singoff::::', res);
        setAccessToken('');
        setIdToken('');
        setInProgress(false);
      }
    } catch (error) {
      console.error('sing off::', error);
      setInProgress(false);
    }
  }, [idToken, setInProgress, setAccessToken, setIdToken]);

  return (
    <Page>
      <Spinner inProgress={inProgress} />
      <View style={styles.container}>
        {accessToken || idToken ? (
          <>
            <Title>idToken</Title>
            <Title>{idToken}</Title>
          </>
        ) : (
          <>
            <Headline style={styles.text}>
              You are not currently authenticated.
            </Headline>
            <Title style={styles.text}>Click Sign On to get started.</Title>
          </>
        )}
      </View>
      {!(accessToken || idToken) ? (
        <Button onPress={doAuthorize} mode="contained">
          Sign On
        </Button>
      ) : (
        <Button mode="contained" onPress={doSignOff}>
          Sign Out
        </Button>
      )}
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
