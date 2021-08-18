import React from 'react';
import {ActivityIndicator, Avatar} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useUserInfoQuery} from '../features/Survey/surveyService';
import {Storage, StorageItems} from '../utils/storage/storage';
import UserInfoPopup from './UserInfoPopup';

// import Icon from 'react-native-vector-icons/Ionicons'; //todo for language switching

function HeaderRight() {
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
    <View style={styles.container}>
      {/*todo language switching*/}
      {/*<Icon name="language" size={20} style={styles.icon} />*/}
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
    </View>
  );
}

export default React.memo(HeaderRight);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
});
