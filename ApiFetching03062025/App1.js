import React,{useEffect} from 'react';
import {Text,View} from "react-native";

const App=()=>{

const getAPIData= async()=>{
//api call

const url="https://jsonplaceholder.com.typicode.com/posts/1"
let result =await fetch(url);
result =await result.json();
console.log(result);
}

useEffect(()=>{
getAPIData();
},[])

  return (
  <View>
    <Text style={{fontSize:30}}>API Call</Text>
  </View>
)
};

export default App;




