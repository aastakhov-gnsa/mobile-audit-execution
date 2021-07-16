import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {AuthContext} from '../../App';
import {signOff} from '../../api/auth';

function HomeScreen() {
  const authContext = React.useContext(AuthContext);

  const doSignOff = React.useCallback(async () => {
    authContext.setInProgress(true);
    try {
      if (authContext.idToken) {
        const res = await signOff(authContext.idToken);
        console.log('singoff::::', res);
        authContext.setAccessToken('');
        authContext.setIdToken('');
        authContext.setInProgress(false);
      }
    } catch (error) {
      console.error('sing off::', error);
      authContext.setInProgress(false);
    }
  }, [authContext]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button onPress={doSignOff}>Sing out</Button>
    </View>
  );
}

export default React.memo(HomeScreen);
