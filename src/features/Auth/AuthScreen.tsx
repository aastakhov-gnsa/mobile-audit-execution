import React from 'react';
import {authorize} from 'react-native-app-auth';
import {AUTH_CONFIG} from '../../../config';
import {View, StyleSheet} from 'react-native';
import Page from './components/Page';
import Spinner from './components/Spinner';
import {Button, Title, Headline} from 'react-native-paper';
import {AuthContext} from '../../App';

function AuthScreen() {
  const authContext = React.useContext(AuthContext);

  const doAuthorize = React.useCallback(async () => {
    authContext.setInProgress(true);
    try {
      const authState = await authorize(AUTH_CONFIG);
      console.log('-->', JSON.stringify(authState, null, 2));
      authContext.setAccessToken(authState.accessToken);
      authContext.setIdToken(authState.idToken);
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
