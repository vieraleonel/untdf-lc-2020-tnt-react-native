import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsFetching(true);

      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.warn(error);
        setIsError(true);
      }
      setIsFetching(false);
    };

    fetchData();
  }, [url]);

  return [{data, isFetching, isError}, setUrl];
};

const RestService = () => {
  const [{data, isFetching, isError}, doFetch] = useDataApi(
    'http://localhost:3000/alojamientos',
    [],
  );

  const _renderAlojamiento = ({item}) => (
    <View style={styles.line}>
      <Text>{item.nombre}</Text>
    </View>
  );

  useEffect(() => {
    doFetch('http://localhost:3000/alojamientos?order=nombre.asc');
  }, [doFetch]);

  return (
    <View style={styles.container}>
      {isFetching ? (
        <Text>Cargando...</Text>
      ) : isError ? (
        <Text>ERROR</Text>
      ) : (
        <FlatList
          initialNumToRender={25}
          windowSize={10}
          data={data}
          ListEmptyComponent={<Text>Lista vacía</Text>}
          renderItem={_renderAlojamiento}
          keyExtractor={alojamiento => alojamiento.id}
        />
      )}
    </View>
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

export default RestService;
