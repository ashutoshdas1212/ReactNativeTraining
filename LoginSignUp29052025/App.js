
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
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/Home';
import Login from './src/Login';
import SignUp from './src/SignUp';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
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
      
    </NavigationContainer>
  );
}