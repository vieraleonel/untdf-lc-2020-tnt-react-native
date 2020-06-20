import React from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ApolloClient from 'apollo-boost';
import {ApolloProvider, useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {useNavigation} from '@react-navigation/native';

const client = new ApolloClient({
  uri: 'http://192.168.1.10:8080/v1/graphql',
});

const Stack = createStackNavigator();

const GraphqlProviderScreen = () => {
  return (
    <ApolloProvider client={client}>
      <Stack.Navigator>
        <Stack.Screen name="GASTRONOMICOS_DEMO_LIST_1" component={GraphqlProviderChild} />
        <Stack.Screen name="GASTRONOMICOS_DEMO_LIST_2" component={GraphqlProviderChild2} />
      </Stack.Navigator>
    </ApolloProvider>
  );
};

const GASTRONOMICOS_POR_LOCALIDAD = gql`
  query myquery($localidad: Int) {
    gastronomicos(where: {nombre: {}, localidad_id: {_eq: $localidad}}) {
      id
      nombre
      domicilio
      localidade {
        nombre
      }
    }
  }
`;

const GraphqlProviderChild = () => {
  const navigation = useNavigation();
  const {loading, error, data} = useQuery(GASTRONOMICOS_POR_LOCALIDAD, {
    variables: {localidad: 1},
    pollInterval: 5000,
  });

  const _renderGastronomico = ({item}) => (
    <View style={styles.line}>
      <Text>{item.nombre}</Text>
      <Text>{item.localidade?.nombre}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Ir a la segunda Lista" onPress={() => {navigation.navigate('GASTRONOMICOS_DEMO_LIST_2')}} />
      {loading ? (
        <Text>Cargando...</Text>
      ) : error ? (
        <Text>ERROR</Text>
      ) : (
        <FlatList
          initialNumToRender={25}
          windowSize={10}
          data={data.gastronomicos}
          ListEmptyComponent={<Text>Lista vacía</Text>}
          renderItem={_renderGastronomico}
          keyExtractor={gastronomico => gastronomico.id}
        />
      )}
    </View>
  );
};

const GraphqlProviderChild2 = () => {
  const {loading, error, data, refetch} = useQuery(GASTRONOMICOS_POR_LOCALIDAD, {
    variables: {localidad: 1},
  });

  const _renderGastronomico = ({item}) => (
    <View style={styles.line}>
      <Text>{item.nombre}</Text>
      <Text>{item.localidade?.nombre}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Actualizar" onPress={() => {refetch()}} />
      {loading ? (
        <Text>Cargando...</Text>
      ) : error ? (
        <Text>ERROR</Text>
      ) : (
        <FlatList
          initialNumToRender={25}
          windowSize={10}
          data={data.gastronomicos}
          ListEmptyComponent={<Text>Lista vacía</Text>}
          renderItem={_renderGastronomico}
          keyExtractor={gastronomico => gastronomico.id}
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

export default GraphqlProviderScreen;
