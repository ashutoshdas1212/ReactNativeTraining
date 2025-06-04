import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App: React.FC = () => {
  return (
    <View style={styles.container}>

      <Text style={{ fontSize: 30 }}>React-native app file structure</Text>

    <Text style={styles.red}> How r you?</Text>

  <Text style={styles.bigBlue} >Blue text </Text>

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


