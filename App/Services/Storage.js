import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

// AlojamientosService.js
// export function syncAlojamientos
const syncAlojamientos = async () => {
  const response = await axios.get('http://192.168.1.10:3000/alojamientos');
  global.storage.save({
    key: 'alojamientos',
    data: response.data,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data;
};

const syncLocalidades = async () => {
  const response = await axios.get('http://192.168.1.10:3000/localidades');
  global.storage.save({
    key: 'localidades',
    data: response.data,
    expires: 1000 * 60 * 60 * 24, // 1 day (1000 * 3600 * 24 milliseconds).
  });
  return response.data;
};

const initStorage = () => {
  global.storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
      alojamientos: syncAlojamientos,
      localidades: syncLocalidades,
    },
  });
};

export {initStorage};
