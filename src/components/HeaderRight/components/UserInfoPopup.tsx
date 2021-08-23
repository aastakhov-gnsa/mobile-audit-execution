import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Subheading, Title} from 'react-native-paper';
import {GnsaUser} from '../../../interfaces/User';
import {signOff} from '../../../api/auth';
import {Secrets} from '../../../utils/encryptedStorage/encryptedStorage';
import {AuthContext} from '../../../context/AuthContext';
import {useDispatch} from '../../../utils/store/configureStore';
import {logout} from '../../../features/Auth/authReducer';
import {Storage} from '../../../utils/storage/storage';
import Popover from '../../Popover';

interface UserInfoPopupProps {
  data?: GnsaUser;
  onDismiss: () => void;
  visible: boolean;
}

function UserInfoPopup({data, visible, onDismiss}: UserInfoPopupProps) {
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
    <Popover visible={visible} onDismiss={onDismiss} style={styles.modal}>
      <View style={styles.info}>
        <Title>{data?.fullName}</Title>
        <Subheading>{data?.internalRole.key}</Subheading>
      </View>
      <Button
        onPress={doSignOff}
        style={styles.logOutButton}
        icon="logout-variant"
        mode="contained">
        Log out
      </Button>
    </Popover>
  );
}

export default React.memo(UserInfoPopup);

const styles = StyleSheet.create({
  logOutButton: {
    borderRadius: 0,
  },
  info: {
    width: 290,
    padding: 16,
    backgroundColor: 'white',
  },
  modal: {
    display: 'flex',
    alignItems: 'flex-end',
    paddingTop: 52,
    paddingRight: 16,
    justifyContent: 'flex-start',
  },
});
