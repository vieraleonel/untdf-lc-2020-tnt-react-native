import React, {useEffect, useState} from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import axios from 'axios';

const RestAsync = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchAlojamientos = async () => {
    setIsError(false);
    setIsFetching(true);

    try {
      const res = await axios.get('http://localhost:3000/alojamientos');
      setAlojamientos(res.data);
    } catch (error) {
      console.warn(error);
      setIsError(true);
    }
    setIsFetching(false);
  };

  const _renderAlojamiento = alojamiento => (
    <View style={styles.line}>
      <Text>{alojamiento.nombre}</Text>
    </View>
  );

  useEffect(() => {
    fetchAlojamientos();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {isFetching ? (
        <Text>Cargando...</Text>
      ) : isError ? (
        <Text>ERROR</Text>
      ) : (
        alojamientos.map(alojamiento => _renderAlojamiento(alojamiento))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default RestAsync;
