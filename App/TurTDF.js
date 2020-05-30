import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AlojamientosScreen from './AlojamientosScreen';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const TurTDF = () => {
  return (
    <Stack.Navigator
      _headerMode="none"
      initialRouteName="Alojamientos"
      screenOptions={screenOptions}>
      <Stack.Screen name="Alojamientos" component={AlojamientosScreen} />
    </Stack.Navigator>
  );
};

export default TurTDF;
