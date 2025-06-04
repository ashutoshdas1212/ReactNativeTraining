import React from 'react';
import { View,  ImageBackground } from 'react-native';

const Background = ({children}) => {
  return (
    <View>
     <ImageBackground source={require("./assets/abstract.jpg")} style={{height:'100%'}}></ImageBackground>
     <View style={{position:"absolute"}}>
        {children}
     </View>
    </View>
  );
}

export default Background;
