import React from 'react'

import { View,StyleSheet,Text} from 'react-native';

const App:React.FC=()=>{
return (

    <View style={{flex:1}}>

<View style={{ flex:1,backgroundColor:'blue'}}/> 
<View style={{ flex:2,backgroundColor:'skyblue'}}/> 
<View style={{ flex:3,backgroundColor:'steelblue'}}/> 

    </View>
)

}

export default App;