import React from 'react';
import {Storage, StorageItems} from '../utils/storage/storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import UserInfoPopup from './UserInfoPopup';

function UserAvatar() {
  const [fullName, setFullName] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const handleVisible = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  React.useEffect(() => {
    const r = async () => {
      if (!fullName) {
        setFullName((await Storage.getItem(StorageItems.fullName)) as string);
      }
    };
    r();
  }, [fullName]);

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
