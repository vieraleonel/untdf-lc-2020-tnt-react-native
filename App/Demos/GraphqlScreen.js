import React, {useEffect, useState} from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import ApolloClient from 'apollo-boost';
import {gql} from 'apollo-boost'; // graphql-tag

const GraphqlScreen = () => {
  const [gastronomicos, setGastronomicos] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchGastronomicos = async () => {
    setIsFetching(true);
    setIsError(false);

    const client = new ApolloClient({
      uri: 'http://192.168.1.10:8080/v1/graphql',
    });

    let data;
    try {
      const response = await client.query({
        query: gql`
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
        `,
        variables: {localidad: 2},
      });
      data = response.data.gastronomicos;
    } catch (error) {
      console.warn(error);
      setIsError(true);
    }
    setIsFetching(false);
    return data;

    // return client
    //     .query({
    //     query: gql`
    //       {
    //         gastronomicos {
    //           id
    //           nombre
    //           domicilio
    //           localidade {
    //             nombre
    //           }
    //         }
    //       }
    //     `,
    //   })
    //   .then(result => result.data.gastronomicos)
    //   .catch(err => {
    //     console.warn(err);
    //     setIsError(true);
    //   })
    //   .finally(() => {
    //     setIsFetching(false);
    //   });
  };

  const _renderGastronomico = gastronomico => (
    <View key={gastronomico.id} style={styles.line}>
      <Text>{gastronomico.nombre}</Text>
      <Text>{gastronomico.localidade?.nombre}</Text>
    </View>
  );

  // ComponentDidMount
  useEffect(() => {
    fetchGastronomicos().then(data => setGastronomicos(data));
  }, []);

  console.log(gastronomicos);

  return (
    <ScrollView style={styles.container}>
      {isFetching ? (
        <Text>Cargando...</Text>
      ) : isError ? (
        <Text>ERROR</Text>
      ) : (
        gastronomicos.map(gastronomico => _renderGastronomico(gastronomico))
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

export default GraphqlScreen;
