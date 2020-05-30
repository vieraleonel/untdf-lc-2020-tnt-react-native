import React, {useEffect, useState} from 'react';
import {ScrollView, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function fetchAlojamientos() {
  return fetch('http://192.168.1.20:3000/alojamientos')
    .then(res => res.json())
    .catch();
}

const AlojamientoScreen = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchAlojamientos().then(data => setAlojamientos(data));
  }, []);

  const _goToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={{ flex: 1}}>
      <Text>ALOJAMIENTOS LISTA</Text>
      {alojamientos.map(alojamiento => <Text>{alojamiento.nombre}</Text>)}
      <Button title="Volver a home" onPress={_goToHome} />
    </ScrollView>
  );
};

export default AlojamientoScreen;
