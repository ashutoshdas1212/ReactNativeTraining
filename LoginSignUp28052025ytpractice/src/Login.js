import React from 'react';
import {View, Text} from 'react-native';
import Background from './Background';
import {darkGreen} from './Constants';

const Login = () => {
  return (
    <Background>
      <View style={{alignItems: 'center', width: 400}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 10,
          }}>
          Login
        </Text>

        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 100,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text style={{color:"grey",fontSize:19,fontWeight:"bold",marginBottom:20}}> Login to your account</Text>
        </View>
      </View>
    </Background>
  );
};

export default Login;



