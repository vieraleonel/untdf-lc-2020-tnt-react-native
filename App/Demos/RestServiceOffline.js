import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TextInput} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

// debería ser un archivo distinto, por ejemplo ApiService
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
        const localData = await global.storage.load({key: 'alojamientos'});
        setData(localData);
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

const useLocalidadesApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsFetching(true);

      try {
        const localData = await global.storage.load({key: 'localidades'});
        setData(localData);
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

const RestServiceOffline = () => {
  const [buscar, onChangeBuscar] = useState('');
  const [localidad, onChangeLocalidad] = useState(null);

  const [alojamientosMeta, doFetch] = useDataApi(
    'http://192.168.1.10:3000/alojamientos',
    [],
  );

  const [localidadesMeta, fetchLocalidades] = useLocalidadesApi(
    'http://192.168.1.10:3000/localidades',
    [],
  );

  const getFilteredAlojmientos = () => {
    let alojamientos = alojamientosMeta.data;
    if (buscar !== '') {
      alojamientos = alojamientos.filter(i => i.nombre.toLowerCase().indexOf(buscar.toLowerCase()) >= 0);
    }
    if (localidad !== null) {
      alojamientos = alojamientos.filter(i => i.localidad_id === localidad);
    }
    return alojamientos;
  };

  const _renderAlojamiento = ({item}) => (
    <View style={styles.line}>
      <Text>{item.nombre} - {item.localidad_id}</Text>
    </View>
  );

  let localidadesIds = alojamientosMeta.data.map(i => i.localidad_id);
  return (
    <View style={styles.container}>

      {alojamientosMeta.isFetching ? (
        <Text>Cargando...</Text>
      ) : alojamientosMeta.isError ? (
        <Text>ERROR</Text>
      ) : (
        <View>
          <View style={{flexDirection: 'row', height: 50, justifyContent: 'space-between', alignItems: 'center'}}>
            <TextInput
              onChangeText={text => onChangeBuscar(text)}
              value={buscar}
              editable
              multiline
              numberOfLines={4}
              maxLength={40}
              style={{width: '50%', backgroundColor: 'lightyellow'}}
            />
            <RNPickerSelect
              style={{width: '50%', backgroundColor: 'lightyellow'}}
              onValueChange={(value) => onChangeLocalidad(value)}
              _items={localidadesMeta.data.map(localidad => ({label: localidad.nombre, value: localidad.id}))}
              items={localidadesMeta.data.filter(localidad => localidadesIds.indexOf(localidad.id) >= 0).map(localidad => ({label: localidad.nombre, value: localidad.id}))}
            />
          </View>
          <FlatList
            initialNumToRender={25}
            windowSize={10}
            data={getFilteredAlojmientos()}
            ListEmptyComponent={<Text>Lista vacía</Text>}
            renderItem={_renderAlojamiento}
            keyExtractor={alojamiento => alojamiento.id}
          />
        </View>
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

export default RestServiceOffline;
