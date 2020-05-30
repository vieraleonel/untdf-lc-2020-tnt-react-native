import React from 'react';
import {View, Text, SafeAreaView, Image, TextInput, ScrollView} from 'react-native';

import Button from '../Components/Button';
import avatar from '../Images/avatar.jpeg';

const DemoInicial = () => {
  const [numbers, setNumbers] = React.useState({orders: 2, photos: 10, comments: 89});
  const [username, setUsername] = React.useState('lviera');
  const [password, setPassword] = React.useState(null);

  // photo
  const _onPress = attribute => () => {
    setNumbers({...numbers, [attribute]: numbers[attribute] + 1});
  };

  const _onChangeUsername = text => {
    setUsername(text);
  };

  const _onChangePassword = text => {
    setPassword(text);
  };

  console.warn('render');

  return (
    <SafeAreaView style={{ backgroundColor: '#593EA9', flex: 1 }}>

      {/* HEADER */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginVertical: 20 }}>
        <Text style={{ marginRight: 5, color: 'white' }}>Barritas</Text>
        <Text style={{ flex: 1, marginRight: 5, color: 'white' }}>Profile</Text>
        <Text style={{ marginRight: 5, color: 'white' }}>Campanita</Text>
        <Text style={{ color: 'white' }}>Cesto</Text>
      </View>

      {/* CARD */}
      <View style={{
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'white',
        marginTop: 75,
        alignItems: 'center',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>

        <Image source={avatar} style={{width: 150, height: 150, borderRadius: 75, marginTop: -75}} />

        {/* BOTONES */}
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
            <Button label="CONNECT" onPress={_onPress('photos')} />
            <Button label="MESSAGE" backgroundColor="#172B4D" onPress={_onPress('comments')} />
          </View>
        </View>

        {/* NUMEROS */}
        <ScrollView
          horizontal
          style={{ marginTop: 10, height: 100}}
        >
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', marginTop: 25 }}>
            <View style={{ alignItems: 'center' }}>
              <Text>{numbers.orders}k</Text>
              <Text>Orders</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text>{numbers.orders}k</Text>
              <Text>Orders</Text>
            </View><View style={{ alignItems: 'center' }}>
              <Text>{numbers.orders}k</Text>
              <Text>Orders</Text>
            </View><View style={{ alignItems: 'center' }}>
              <Text>{numbers.orders}k</Text>
              <Text>Orders</Text>
            </View><View style={{ alignItems: 'center' }}>
              <Text>{numbers.orders}k</Text>
              <Text>Orders</Text>
            </View><View style={{ alignItems: 'center' }}>
              <Text>{numbers.orders}k</Text>
              <Text>Orders</Text>
            </View><View style={{ alignItems: 'center' }}>
              <Text>{numbers.orders}k</Text>
              <Text>Orders</Text>
            </View><View style={{ alignItems: 'center' }}>
              <Text>{numbers.orders}k</Text>
              <Text>Orders</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text>{numbers.photos}</Text>
              <Text>Photos</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text>{numbers.comments}</Text>
              <Text>Comments</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text>{numbers.comments}</Text>
              <Text>Comments</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text>{numbers.comments}</Text>
              <Text>Comments</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text>{numbers.comments}</Text>
              <Text>Comments</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text>{numbers.comments}</Text>
              <Text>Comments</Text>
            </View>
          </View>
        </ScrollView>

        <ScrollView style={{marginTop: 20, width: 200}}>
          <Text>username</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={_onChangeUsername}
            value={username}
          />
          <Text style={{marginTop:10}}>password</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={_onChangePassword}
            value={password}
            secureTextEntry
          />
          <Text style={{marginTop:10}}>password</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={_onChangePassword}
            value={password}
            secureTextEntry
          />
          <Text style={{marginTop:10}}>password</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={_onChangePassword}
            value={password}
            secureTextEntry
          />
          <Text style={{marginTop:10}}>password</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={_onChangePassword}
            value={password}
            secureTextEntry
          />
          <Text style={{marginTop:10}}>password</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={_onChangePassword}
            value={password}
            secureTextEntry
          />
          <Text style={{marginTop:10}}>password</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={_onChangePassword}
            value={password}
            secureTextEntry
          />
          <Text style={{marginTop:10}}>password</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={_onChangePassword}
            value={password}
            secureTextEntry
          />
          <Text style={{marginTop:10}}>password</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={_onChangePassword}
            value={password}
            secureTextEntry
          />
          <Text style={{marginTop:10}}>password</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={_onChangePassword}
            value={password}
            secureTextEntry
          />
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

export default DemoInicial;
