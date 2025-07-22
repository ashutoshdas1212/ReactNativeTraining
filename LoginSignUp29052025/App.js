import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
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
import CartScreen from './src/cart/CartScreen';
import CheckoutScreen from './src/CheckoutScreen';
import WishlistScreen from './src/wishlist/WishlistScreen';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import SignUp from './src/SignUp';
import Login from './src/Login';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const AuthStack = createNativeStackNavigator();

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
        options={{headerShown: false}}
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
        options={{headerShown: false}}
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

function WishlistStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: 'Your Wishlist',
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

const OrdersScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: 24}}>Your Orders</Text>
  </View>
);
const SettingsScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: 24}}>App Settings</Text>
  </View>
);
const HelpScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: 24}}>Help Center</Text>
  </View>
);

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="SignUp" screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
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
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Wishlist"
        component={WishlistStack}
        options={({navigation}) => ({
          drawerIcon: ({color, size}) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
          headerTitle: 'Wishlist',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#003580'},
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Main Screen')}
              style={{marginLeft: 15}}>
              <Ionicons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="list" color={color} size={size} />
          ),
          headerTitle: 'Your Orders',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
          headerTitle: 'App Settings',
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
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
  const auth = require('react-redux').useSelector ? require('react-redux').useSelector(state => state.auth) : null;
  // fallback for hooks in function body
  let isAuthenticated = false;
  let otpStatus = 'idle';
  try {
    const { currentUser, otpStatus: otp } = useSelector(state => state.auth);
    isAuthenticated = !!currentUser;
    otpStatus = otp;
  } catch (e) {}
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          {isAuthenticated && otpStatus === 'succeeded' ? (
            <MainDrawerNavigator />
          ) : (
            <AuthStackNavigator />
          )}
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
