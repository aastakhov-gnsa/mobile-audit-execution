import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ICON_SIZE} from '../../constants/constants';
import {ScreenNames} from '../../navigation/navigation';
import Help from './components/Help';
import {Alert, StyleSheet} from 'react-native';
import HeaderControlsContainer from '../HeaderControlsContainer';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NavigationParams} from '../../interfaces/navigation';

export default function EvaluationHeaderRight({surveyId}: {surveyId: string}) {
  const navigation = useNavigation<NavigationParams>();
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <HeaderControlsContainer>
      <Icon
        name="information-outline"
        size={ICON_SIZE}
        style={styles.icon}
        onPress={() =>
          navigation.navigate(ScreenNames.AuditDetails, {id: surveyId})
        }
      />
      <Help style={styles.icon} />
      {/*todo implement language switching*/}
      <Icon
        name="translate"
        size={ICON_SIZE}
        onPress={() => Alert.alert('TODO language switching')}
      />
    </HeaderControlsContainer>
  );
}

const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
  StyleSheet.create({
    icon: {
      marginRight: 20,
      color: colors.text,
    },
  });
