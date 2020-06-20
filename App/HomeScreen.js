import React from 'react';
import {ScrollView, StyleSheet, Text, Button, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const _goTo = routeName => () => {
    navigation.navigate(routeName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text>HomeScreen</Text>
        <Button title="Demo primeras clases" onPress={_goTo('DEMO_INICIAL')} />
        <Button title="TDF Turismo APP" onPress={_goTo('TurTDF')} />
        <Button title="REST promise" onPress={_goTo('REST_PROMISE')} />
        <Button title="REST async" onPress={_goTo('REST_ASYNC')} />
        <Button title="REST service" onPress={_goTo('REST_SERVICE')} />
        <Button title="Maps con permisos" onPress={_goTo('MAPA_CON_PERMISOS')} />
        <Button title="GraphQL" onPress={_goTo('GRAPHQL')} />
        <Button title="GraphQL Provider" onPress={_goTo('GRAPHQL_PROVIDER')} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
