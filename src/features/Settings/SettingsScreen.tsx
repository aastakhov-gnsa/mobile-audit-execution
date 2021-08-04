import React from 'react';
import {Button, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {signOff} from '../../api/auth';
import {Secrets} from '../../utils/encryptedStorage/encryptedStorage';

const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

function SettingsScreen() {
  const authContext = React.useContext(AuthContext);

  const doSignOff = React.useCallback(async () => {
    authContext.setInProgress(true);
    try {
      if (authContext.idToken) {
        const res = await signOff(authContext.idToken);
        console.log('sing off::::', res);
        authContext.setAccessToken('');
        authContext.setIdToken('');
        await Secrets.clearSecrets();
        authContext.setInProgress(false);
      }
    } catch (error) {
      console.error('sing off error::', error);
      authContext.setInProgress(false);
    }
  }, [authContext]);
  return (
    <View style={styles.view}>
      <Text>Settings Screen</Text>
      <Button onPress={doSignOff}>Sing out</Button>
    </View>
  );
}

export default React.memo(SettingsScreen);
