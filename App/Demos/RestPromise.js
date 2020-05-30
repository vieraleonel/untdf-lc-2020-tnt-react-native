import React, {useEffect, useState} from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import axios from 'axios';

const RestPromise = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchAlojamientos = () => {
    setIsFetching(true);
    setIsError(false);

    return axios
      .get('http://localhost:3000/alojamientos')
      .then(response => response.data)
      .then(data => data.map(i => ({id: i.id, nombre: i.nombre})))
      .catch(err => {
        console.warn(err);
        setIsError(true);
      })
      .finally(() => {
        setIsFetching(false);
      });

    // return fetch('http://localhost:3000/-alojamientos')
    //   .then(response => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw 'IS NOT OK';
    //     }
    //   })
    //   .then(data => data.map(i => i.nombre))
    //   .catch(err => {
    //     console.warn(err);
    //     setIsError(true);
    //   })
    //   .finally(() => {
    //     setIsFetching(false);
    //   });
  };

  const _renderAlojamiento = alojamiento => (
    <View key={alojamiento.id} style={styles.line}>
      <Text>{alojamiento.nombre}</Text>
    </View>
  );

  // ComponentDidMount
  useEffect(() => {
    fetchAlojamientos().then(data => setAlojamientos(data));
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

export default RestPromise;
