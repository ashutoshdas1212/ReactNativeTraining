
// import * as React from 'react';
// import {View, Text} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from './src/Home';
// import Login from './src/Login';
// import SignUp from './src/SignUp';
// import {useNavigation} from '@react-navigation/native';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// function MainTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Login" component={Login} />
//       <Tab.Screen name="SignUp" component={SignUp} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={Home}
//           options={{
//             title: 'Home Screen',
//             headerStyle: {
//               backgroundColor: 'green',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//             headerTitleAlign: 'center'
//           }}
//         />
//         <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
//         <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
        
//  <Stack.Screen name="MainTabs" component={MainTabs} options={{headerShown:false}} />

//       </Stack.Navigator>
      
//       </NavigationContainer>
      
//         )
//         }









import * as React from 'react';
import {View, Text,Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/Home';
import Login from './src/Login';
import SignUp from './src/SignUp';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack()
{
  return(
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
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
        


      </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
     <Tab.Navigator>
      <Tab.Screen name="HomeStack" component={HomeStack} options={{headerShown:false,title:'Home',tabBarIcon:({size,color})=>{
        return(
          <Image style={{width:size,height:size}} source={require('./images/Home.png')} />
        )
      }}}></Tab.Screen>
       <Tab.Screen name="Login" component={Login} options={{headerShown:false,tabBarIcon:({size,color})=>{
        return(
          <Image style={{width:size,height:size}} source={require('./images/Login.png')} />
        )
      }}} />
        <Tab.Screen name="SignUp" component={SignUp} options={{headerShown:false,tabBarIcon:({size,color})=>{
        return(
          <Image style={{width:size,height:size}} source={require('./images/SignUp.png')} />
        )
      }}} />
     </Tab.Navigator>
      
    </NavigationContainer>
  );
}