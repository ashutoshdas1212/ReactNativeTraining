import React from 'react'

import { View,StyleSheet,Text} from 'react-native';

const App:React.FC=()=>{
return (

    <View style={{height:'100%'}}>

<View style={{ height:'15%',backgroundColor:'blue'}}/> 
<View style={{ width:'66%',height:'35%',backgroundColor:'skyblue'}}/> 
<View style={{ width:'33%',height:'50%',backgroundColor:'steelblue'}}/> 

    </View>
);

};

export default App;