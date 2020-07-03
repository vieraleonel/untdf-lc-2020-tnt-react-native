import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import DemoInicial from './Demos/DemoInicial';
// import TurTDF from './TurTDF';
import RestPromise from './Demos/RestPromise';
import RestAsync from './Demos/RestAsync';
import RestService from './Demos/RestService';
import RestServiceOffline from './Demos/RestServiceOffline';
import MapaScreen from './Demos/MapaScreen';
import GraphqlScreen from './Demos/GraphqlScreen';
import GraphqlProviderScreen from './Demos/GraphqlProviderScreen';

import {initStorage} from './Services/Storage';
initStorage();

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

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        _headerMode="none"
        initialRouteName="Home"
        screenOptions={screenOptions}>
        <Stack.Screen name="HOME" component={HomeScreen} />
        <Stack.Screen name="DEMO_INICIAL" component={DemoInicial} />
        {/*<Stack.Screen name="TUR_TDF" component={TurTDF} /> */}
        <Stack.Screen name="REST_PROMISE" component={RestPromise} />
        <Stack.Screen name="REST_ASYNC" component={RestAsync} />
        <Stack.Screen name="REST_SERVICE" component={RestService} />
        <Stack.Screen name="REST_SERVICE_OFFLINE" component={RestServiceOffline} />
        <Stack.Screen name="MAPA_CON_PERMISOS" component={MapaScreen} />
        <Stack.Screen name="GRAPHQL" component={GraphqlScreen} />
        <Stack.Screen name="GRAPHQL_PROVIDER" component={GraphqlProviderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
