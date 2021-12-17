import React from 'react';
import {StyleSheet} from 'react-native';
import Popover from './Popover';
import UserInfo from './UserInfo';
import LogoutButton from './LogoutButton';

interface UserInfoPopupProps {
  onDismiss: () => void;
  visible: boolean;
  fullName: string;
}

function UserInfoPopup({fullName, visible, onDismiss}: UserInfoPopupProps) {
  return (
    <Popover visible={visible} onDismiss={onDismiss} style={styles.modal}>
      <UserInfo fullName={fullName} cb={onDismiss} />
      <LogoutButton cb={onDismiss} />
    </Popover>
  );
}

export default React.memo(UserInfoPopup);

const styles = StyleSheet.create({
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: 52,
    paddingLeft: 16,
    justifyContent: 'flex-start',
  },
});
