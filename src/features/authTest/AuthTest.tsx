import React from 'react';
import {View, Modal, ActivityIndicator, Text, StyleSheet} from 'react-native';
import Heading from './components/Heading';
import ButtonContainer from './components/ButtonContainer';
import Page from './components/Page';
import Button from './components/Button';
import {AUTH_CONFIG} from '../../../config';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {authorize} from 'react-native-app-auth';
import {signOff} from './api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  view: {flex: 1, alignItems: 'center', alignContent: 'center'},
  userInfo: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  text: {color: 'white'},
  spinner: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});

// todo remove
function AuthTest() {
  const [orientation] = React.useState('portrait');
  const [accessToken, setAccessToken] = React.useState('');
  const [idToken, setIdToken] = React.useState('');
  const [, setIdTokenJSON] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);
  const [inProgress, setInProgress] = React.useState(false);

  const spinner = inProgress && (
    <Modal transparent={true} animationType={'none'} visible={inProgress}>
      <View style={styles.spinner}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );

  const doSignOff = async () => {
    setInProgress(true);
    try {
      if (idToken) {
        const res = await signOff(idToken);
        console.log('singoff::::', res);
        setAccessToken('');
        setIdToken('');
        setIdTokenJSON(null);
        setUserInfo(null);
        setInProgress(false);
      }
    } catch (error) {
      console.error('sing off::', error);
      setInProgress(false);
    }
  };

  const doAuthorize = async () => {
    setInProgress(true);

    try {
      const authState = await authorize(AUTH_CONFIG);
      console.log('-->', JSON.stringify(authState, null, 2));
      await setAccessToken(authState.accessToken);
      await setIdToken(authState.idToken);
      await setUserInfo(authState);
      setInProgress(false);
    } catch (error) {
      console.error(error);
      setInProgress(false);
    }
  };
  const buttons = (
    <ButtonContainer>
      {accessToken || idToken ? (
        <Button onPress={doSignOff} text="Sign Off" />
      ) : (
        <Button onPress={doAuthorize} text="Sign On" />
      )}
    </ButtonContainer>
  );

  const bodyContainer =
    accessToken || idToken ? (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <View>
            <Text style={styles.text}>User info</Text>
            <Text style={styles.text}>{JSON.stringify(userInfo, null, 2)}</Text>
          </View>
          <Heading
            fontSize={orientation === 'portrait' ? hp('3%') : hp('7%')}
            textAlign={orientation === 'portrait' ? 'center' : 'right'}
            marginRight={hp('3%')}>
            Congratulations!
          </Heading>
          <Heading
            fontSize={orientation === 'portrait' ? hp('3%') : hp('7%')}
            textAlign={orientation === 'portrait' ? 'center' : 'left'}>
            This is a secure resource.
          </Heading>
        </View>
      </View>
    ) : (
      <View style={styles.view}>
        <Heading marginTop={hp('20%')}>
          You are not currently authenticated.
        </Heading>
        <Heading fontSize={hp('5%')} marginBottom={hp('45%')}>
          Click Sign On to get started.
        </Heading>
      </View>
    );
  return (
    <Page>
      {spinner}
      {bodyContainer}
      {buttons}
    </Page>
  );
}

export default React.memo(AuthTest);
