import React from 'react';
import {Button} from 'react-native-paper';
import {signOff} from '../api/auth';
import {Secrets} from '../utils/encryptedStorage/encryptedStorage';
import {Storage} from '../utils/storage/storage';
import {logout} from '../features/Auth/authReducer';
import {AuthContext} from '../context/AuthContext';
import {useDispatch} from '../utils/store/configureStore';
import {StyleSheet} from 'react-native';

function LogoutButton() {
  const authContext = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const doSignOff = React.useCallback(async () => {
    authContext.setInProgress(true);
    try {
      if (authContext.idToken) {
        const res = await signOff(authContext.idToken);
        console.log('sing off::::', res);
        authContext.setAccessToken('');
        authContext.setIdToken('');
        await Secrets.clearSecrets();
        await Storage.clearStorage();
        authContext.setInProgress(false);
        dispatch(logout());
      }
    } catch (error) {
      console.error('sing off error::', error);
      authContext.setInProgress(false);
    }
  }, [authContext, dispatch]);

  return (
    <Button
      onPress={doSignOff}
      style={styles.logOutButton}
      icon="logout-variant"
      mode="contained">
      Log out
    </Button>
  );
}

export default React.memo(LogoutButton);

const styles = StyleSheet.create({
  logOutButton: {
    borderRadius: 0,
  },
});
