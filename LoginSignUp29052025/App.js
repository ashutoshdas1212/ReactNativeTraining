import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './src/Home';
import Profile from './src/Profile';
import Details from './src/Details';
import CartScreen from './src/CartScreen';
import CheckoutScreen from './src/CheckoutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'CartStack') {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{title: 'Cart'}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile'}}
        
      />
    </Tab.Navigator>
  );
}

function HomeStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Product Details',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color="black"
                style={{marginLeft: 15}}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function CartStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Checkout',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color="black"
                style={{marginLeft: 15}}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function DummyScreen({title, navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 24}}>{title}</Text>
    </View>
  );
}

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({navigation}) => ({
        drawerActiveTintColor: 'tomato',
        drawerInactiveTintColor: 'gray',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Ionicons
              name="menu"
              size={24}
              color="black"
              style={{marginLeft: 15}}
            />
          </TouchableOpacity>
        ),
      })}>
      <Drawer.Screen
        name="Main Screen"
        component={MainTabNavigator}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerTitle: 'Main Screen',
          headerTitleAlign: 'center'
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={({navigation}) => (
          <DummyScreen title="Your Orders" navigation={navigation} />
        )}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="list" color={color} size={size} />
          ),
          headerTitle: 'Your Orders',
          headerTitleAlign: 'center'
        }}
      />
      <Drawer.Screen
        name="Wishlist"
        component={({navigation}) => (
          <DummyScreen title="Your Wishlist" navigation={navigation} />
        )}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
          headerTitle: 'Your Wishlist',
          headerTitleAlign: 'center'
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={({navigation}) => (
          <DummyScreen title="App Settings" navigation={navigation} />
        )}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          headerTitle: 'App Settings',
          headerTitleAlign: 'center'
        }}
      />
      <Drawer.Screen
        name="Help"
        component={({navigation}) => (
          <DummyScreen title="Help Center" navigation={navigation} />
        )}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="help-circle" color={color} size={size} />
          ),
          headerTitle: 'Help Center',
          headerTitleAlign: 'center', 
        }}
      />
    
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MainDrawerNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
