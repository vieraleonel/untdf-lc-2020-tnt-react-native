import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {fetchAlojamientos, getAll, getOne, isError, isFetching} from '../Redux/AlojamientosSlice';
import {connect} from 'react-redux';

const ReduxAlojamientos = props => {

  const _renderAlojamiento = ({item}) => (
    <View style={styles.line}>
      <TouchableOpacity onPress={() => console.warn(props.singleAlojamiento(item.id))}>
        <Text>{item.nombre}</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    props.fetchAlo();
  }, []);

  return (
    <View style={styles.container}>
      {props.isFetching ? (
        <Text>Cargando...</Text>
      ) : props.isError ? (
        <Text>ERROR</Text>
      ) : (
        <FlatList
          initialNumToRender={25}
          windowSize={10}
          data={props.alojamientos}
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

const mapStateToProps = state => {
  return {
    alojamientos: getAll(state),
    isFetching: isFetching(state),
    isError: isError(state),
    singleAlojamiento: id => getOne(state, id),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAlo: () => dispatch(fetchAlojamientos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxAlojamientos);
