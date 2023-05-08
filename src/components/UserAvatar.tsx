import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import UserInfoPopup from './UserInfoPopup';
import {useUserName} from '../hooks/useUserName';

function UserAvatar() {
  const fullName = useUserName();
  const [visible, setVisible] = React.useState(false);
  const handleVisible = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <>
      <TouchableOpacity onPress={handleVisible}>
        {fullName ? (
          <Avatar.Text
            label={`${fullName.charAt(0)}${fullName.split(' ')?.[1].charAt(0)}`}
            size={30}
          />
        ) : (
          <ActivityIndicator />
        )}
      </TouchableOpacity>
      <UserInfoPopup
        visible={visible}
        onDismiss={handleVisible}
        fullName={fullName}
      />
    </>
  );
}

export default React.memo(UserAvatar);
