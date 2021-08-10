import React from 'react';
import {Subheading} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface StatusWithIconProps {
  status: string;
}
function StatusWithIcon({status}: StatusWithIconProps) {
  return (
    <View style={styles.statusContainer}>
      {getStatusIcon(status)}
      <Subheading>{status}</Subheading>
    </View>
  );
}

export default React.memo(StatusWithIcon);

const styles = StyleSheet.create({
  icon: {
    fontSize: 16,
    marginRight: 12,
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function getStatusIcon(v: string) {
  switch (v?.toLowerCase()) {
    case 'completed': {
      return <Icon name="check" color="#25B220" style={styles.icon} />;
    }
    case 'in progress':
    case 'open': {
      return <Icon name="clockcircleo" color="#FCB814" style={styles.icon} />;
    }
    case 'failed': {
      return <Icon name="close" color="#FD6464" style={styles.icon} />;
    }
    default: {
      return <Icon name="question" />;
    }
  }
}
