import React, { useState } from 'react';
import { View, StyleSheet, Platform, Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PERMISSIONS, check, RESULTS, request } from 'react-native-permissions';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MapaScreen = () => {
  const [gpsStatus, setGpsStatus] = useState(RESULTS.GRANTED);
  const [activeMarker, setActiveMarker] = useState(null);
  const navigation = useNavigation();

  const _pedirPermisoGps = async () => {
    const permission = Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    });

    try {
      const result = await check(permission);
      console.warn(result);
      if (result !== RESULTS.GRANTED) {
        const requestResult = request(permission);
        if (requestResult !== RESULTS.GRANTED) {
          navigation.navigate('HOME');
        } else {
          setGpsStatus(RESULTS.GRANTED);
        }
      }
    } catch (error) {
      console.warn('ERROR!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Pedir permiso" onPress={_pedirPermisoGps} />
      {gpsStatus === RESULTS.GRANTED
        ? (
          <View style={styles.map}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
              onPress={()=>{setActiveMarker(false)}}
            >
              <Marker
                coordinate={{
                  latitude: 37.788947,
                  longitude: -122.433047,
                }}
                anchor={{ x: 0.5, y: 0.5 }}
                onPress={(event) => {
                  event.stopPropagation()
                  setActiveMarker(true)
                }}
              >
                <View style={{ backgroundColor: '#40E9A4', padding: 10, borderRadius: 8, elevation: 3, shadowRadius: 2, shadowColor: 'black', shadowOffset: { width: 10, height: 10 } }}>
                  <Icon name="hotel" size={20} color="white" />
                </View>
              </Marker>
            </MapView>
            {activeMarker ?
              (<View style={{ position: 'absolute', bottom: 20, left: 20, height: 200, width: 200, backgroundColor: 'red' }}>

              </View>)
              : null}
          </View>
        )
        : null
      }

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapaScreen;
