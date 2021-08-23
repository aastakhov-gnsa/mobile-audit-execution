import React from 'react';
import {Storage, StorageItems} from '../../../utils/storage/storage';
import {useUserInfoQuery} from '../../../features/Survey/surveyService';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import UserInfoPopup from './UserInfoPopup';

function UserAvatar() {
  const [userName, setUserName] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const handleVisible = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  React.useEffect(() => {
    const r = async () => {
      if (!userName) {
        const uN = (await Storage.getItem(StorageItems.userName)) as string;
        setUserName(uN);
      }
    };
    r();
  }, [userName]);

  const {data} = useUserInfoQuery(userName);

  return (
    <>
      <TouchableOpacity onPress={handleVisible}>
        {data ? (
          <Avatar.Text
            label={`${data?.firstName.charAt(0)}${data?.lastName.charAt(0)}`}
            size={30}
          />
        ) : (
          <ActivityIndicator />
        )}
      </TouchableOpacity>
      <UserInfoPopup data={data} visible={visible} onDismiss={handleVisible} />
    </>
  );
}

export default React.memo(UserAvatar);
