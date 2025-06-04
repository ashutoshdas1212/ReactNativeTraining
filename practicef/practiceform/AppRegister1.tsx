import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';

const App=()=>{
const [firstName,setFirstName]=useState('');
const [lastName,setLastName]=useState('');

const [dob,setDob]=useState('');
const [mobile,setMobile]=useState('');



const validateForm=()=>{
 if(!firstName || !lastName || !mobile || !dob)
 {
    Alert.alert('Validation error','All fields should be filled')
    return false;
 }

 if(!/^[A-Za-z\s]+$/.test(firstName))
 {
    Alert.alert('Validation error','firstname is not alphabetical')
    return false;
 }
 if(!/^[A-Za-z\s]+$/.test(lastName))
 {
    Alert.alert('validation err','lastname is not alphabetical')
    return false;
}

if(mobile.length!==10 ||  isNaN(Number(mobile)))
{
    Alert.alert('validtion err','mobile num not valid')
    return false;
}


    return true;
};

const handleRegister=()=>{
    if(validateForm())
    {
        Alert.alert('Success','Registration succesful');
    }
};
    return(
        <SafeAreaView>
        <ScrollView>
            <Text style={styles.heading}> Registration Form</Text>
           
      <View>
       <Text style={styles.label}>First Name</Text>
       <TextInput value={firstName} style={styles.input} onChangeText={setFirstName}></TextInput>    
        </View>

        <View>
         <Text>Last Name</Text>
        <TextInput value={lastName} style={styles.input} onChangeText={setLastName}></TextInput>    
        </View>


        <View>

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput value={mobile} style={styles.input} onChangeText={setMobile}></TextInput>
        </View>


        <View>
         <Text style={styles.label}>Date of Birth (DD-MM-YYYY)</Text>
             <TextInput
               style={styles.input}
               value={dob}
               onChangeText={setDob}
             />
             </View>
     <View>        
<TouchableOpacity style={styles.button} onPress={handleRegister}>
   <Text style={styles.button}>Register It</Text> 
</TouchableOpacity>
      </View>   
        
        </ScrollView>

        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    heading:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:40
    }
    ,
    label:{
        
        fontWeight:'bold'
    },
    input:{
        backgroundColor:'gray'
    },
    button:{
   
 

        padding:10,
        alignItems:'center',
        backgroundColor:'blue'
    }
})


export default App;