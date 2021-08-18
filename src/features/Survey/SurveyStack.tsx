import React from 'react';
import {Stack} from '../../navigation/navigation';
import SurveysScreen from './SurveysScreen';
import HeaderRight from '../../components/HeaderRight';
import {StyleSheet} from 'react-native';
import themeConfig from '../../../themeConfig';

function SurveyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Surveys"
        component={SurveysScreen}
        options={{
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.headerStyle,
          headerRight: () => <HeaderRight />,
        }}
      />
    </Stack.Navigator>
  );
}

export default React.memo(SurveyStack);

const styles = StyleSheet.create({
  headerTitle: {
    color: themeConfig.defaultTheme.colors.background,
  },
  headerStyle: {
    backgroundColor: themeConfig.defaultTheme.colors.onSurface,
  },
});
