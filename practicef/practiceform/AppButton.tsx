import React from 'react';
import { Button,Alert,StyleSheet, Text, View } from 'react-native';

const App: React.FC = () => {

const onPress=()=>{
    Alert.alert('Button pressed')
};

  return (
  

    <View style={styles.container}>

      <Text style={{ fontSize: 30 }}>React-native app file structure</Text>

    <Text style={styles.red}> How r you?</Text>

  <Text style={styles.bigBlue} >Blue text </Text>
<Button onPress={onPress} title="Press the button "></Button>
    </View>
  );
};

const styles=StyleSheet.create({
  red:{
    color:'red'
  },
  container:{
    marginTop:100,
  },
  bigBlue:{
    color:'orange',
    fontWeight:'bold',
    fontSize:30,

  }
});

export default App;


