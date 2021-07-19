import React from 'react';
import {Tab} from '../../navigation/navigation';
import HomeScreen from './HomeScreen';
import SettingsScreen from '../Settings/SettingsScreen';

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default React.memo(HomeTabs);
