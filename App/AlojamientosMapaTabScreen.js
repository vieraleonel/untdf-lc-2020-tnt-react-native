import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AlojamientoScreen = () => {
  const navigation = useNavigation();

  const _goToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ALOJAMIENTOS MAPA</Text>
      <Button title="Volver a home" onPress={_goToHome} />
    </View>
  );
};

export default AlojamientoScreen;
