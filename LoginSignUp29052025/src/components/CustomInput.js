import { StyleSheet, Text, View,TextInput } from 'react-native';
import React from 'react';
import { fontFamily } from '../../constants/fontFamily';
import { fontSize, iconSize, spacing } from '../../constants/dimensions';

import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../Constants';

const CustomInput = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>Your Email</Text>
      <View style={styles.inputFieldContainer}>
      <TextInput />
      <Ionicons name={"mail-outline"} size={iconSize.md} color={colors.iconSecondary} style={styles.icon}/>
       <TextInput style={styles.textInput}/>
      </View>
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
container:{},
inputLabel:{
    fontFamily:fontFamily.semiBold,
    fontSize:fontSize.md,
    color:colors.textPrimary
},
inputFieldContainer:{
    borderWidth:1,
    borderColor:"#F1ECEC",
    borderRadius:12,
    flexDirection:"row",
    alignItems:"center"
},
icon:{
// marginHorizontal:spacing.sm
},
textInput:{

}

})