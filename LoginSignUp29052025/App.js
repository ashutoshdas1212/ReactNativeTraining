import * as React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './src/Home';
import Login from './src/Login';
import SignUp from './src/SignUp';
import Profile from './src/Profile';
import Details from './src/Details';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home Screen',
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{tabBarStyle: 90}}>
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              headerShown: false,
              title: 'Home',
              tabBarIcon: ({size, color}) => {
                return (
                  <Image
                    style={{width: size, height: size, tintColor: color}}
                    source={require('./images/Home.png')}
                  />
                );
              },
            }}></Tab.Screen>
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({size}) => {
                return (
                  <Image
                    style={{width: size, height: size}}
                    source={require('./images/Profile.jpg')}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Details"
            component={Details}
            options={{
              tabBarIcon: ({size, color}) => {
                return (
                  <Image
                    style={{width: size, height: size, tintColor: color}}
                    source={require('./images/Details.png')}
                  />
                );
              },
            }}
          />
          
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
