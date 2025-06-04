import React ,{useState} from 'react';
import { TextInput,StyleSheet, Text, View } from 'react-native';

const App: React.FC = () => {

    const [text,setText]=useState('');
  return (
    <View style={styles.container}>

      <Text style={{ fontSize: 30 }}>React-native app file structure</Text>

    <Text style={styles.red}> How r you?</Text>

<TextInput placeholder='Typ here....' value={text} onChangeText={(newText)=>setText(newText)}/>

<Text >You typed:{text}</Text>

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


