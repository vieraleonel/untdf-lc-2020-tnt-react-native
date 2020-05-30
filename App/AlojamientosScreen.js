import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AlojamientosListaTabScreen from './AlojamientosListaTabScreen';
import AlojamientosMapaTabScreen from './AlojamientosMapaTabScreen';

const Tab = createMaterialBottomTabNavigator();

const AlojamientoScreen = () => {

  const _renderTabBarIcon = ({ focused, color, size }) => 
    <Icon name="format-list-bulleted" color={color} size={size}/>

  return (
    <Tab.Navigator tabBarIcon={_renderTabBarIcon}>
      <Tab.Screen
        name="AlojamientosLista"
        component={AlojamientosListaTabScreen}
      />
      <Tab.Screen 
        name="AlojamientosMapa" 
        component={AlojamientosMapaTabScreen} 
        tabBarIcon="map-marker-outline"
      />
    </Tab.Navigator>
  );
};

export default AlojamientoScreen;
