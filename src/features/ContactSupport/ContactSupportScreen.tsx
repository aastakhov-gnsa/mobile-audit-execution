import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

function ContactSupportScreen() {
  const handleCall = React.useCallback(() => {
    Linking.openURL('tel:+12345667');
  }, []);
  const handleMail = React.useCallback(() => {
    Linking.openURL('mailto:exampla@mail.ru');
  }, []);
  return (
    <View>
      <Text>TODO: ContactSupportScreen</Text>
      <TouchableOpacity style={linkStyle} onPress={handleCall}>
        <Icon name="call-outline" style={styles.linkIcon} />
        <Text>Call tech support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={linkStyle} onPress={handleMail}>
        <Icon name="mail-outline" style={styles.linkIcon} />
        <Text>Send an e-mail</Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(ContactSupportScreen);

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 15,
  },
  linkIcon: {
    marginRight: 10,
  },
  link: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});
const linkStyle = StyleSheet.flatten([styles.paragraph, styles.link]);
