import React from 'react';
import {View, Modal, ActivityIndicator, Text} from 'react-native';
import Heading from './components/Heading';
import ButtonContainer from './components/ButtonContainer';
import Page from './components/Page';
import Button from './components/Button';
import {AUTH_CONFIG} from '../../config';

import {
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import {authorize} from 'react-native-app-auth';
import {signOff} from './api';

// todo remove
function AuthTest() {
  const [orientation, setOrientation] = React.useState('portrait');
  const [accessToken, setAccessToken] = React.useState('');
  const [idToken, setIdToken] = React.useState('');
  const [idTokenJSON, setIdTokenJSON] = React.useState(null);
  const [authStateParam, setAuthStateParam] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);
  const [inProgress, setInProgress] = React.useState(false);

  // const dataHandler = ({idToken, userInfo}: any) => {
  //     setIdToken(idToken !== undefined ? idToken : idTokenJSON)
  //     setUserInfo(userInfo === undefined ? userInfo : userInfo)
  // }
  const spinner = inProgress && (
    <Modal transparent={true} animationType={'none'} visible={inProgress}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
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
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            flex: 3,
            flexDirection: orientation == 'portrait' ? 'column' : 'row',
            justifyContent: 'space-around',
          }}>
          <View>
            <Text style={{color: 'white'}}>User info</Text>
            <Text style={{color: 'white'}}>
              {JSON.stringify(userInfo, null, 2)}
            </Text>
          </View>
          <Heading
            fontSize={orientation == 'portrait' ? hp('3%') : hp('7%')}
            textAlign={orientation == 'portrait' ? 'center' : 'right'}
            marginRight={hp('3%')}>
            Congratulations!
          </Heading>
          <Heading
            fontSize={orientation == 'portrait' ? hp('3%') : hp('7%')}
            textAlign={orientation == 'portrait' ? 'center' : 'left'}>
            This is a secure resource.
          </Heading>
        </View>
      </View>
    ) : (
      <View style={{flex: 1, alignItems: 'center', alignContent: 'center'}}>
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
