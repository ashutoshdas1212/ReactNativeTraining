import React from 'react';
import { View,StyleSheet, Text } from 'react-native';
import Background from './Background'
import Btn from './Btn'
import {darkGreen} from './Constants'

const Home = (props) => {
  return (
   <Background>
    <View style={{marginHorizontal:40, marginVertical:100}}>
     <Text style={{color:'white', fontSize:64}}>
    User Registration
     </Text>

     <Btn bgColor={darkGreen} textColor='white' btnLabel="Login" Press={()=>props.navigation.navigate("Login")} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="SignUp" Press={()=>props.navigation.navigate("SignUp")} />
     </View>
   </Background>
  );
}

export default Home;
