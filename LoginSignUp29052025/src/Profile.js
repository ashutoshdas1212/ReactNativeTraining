import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ProfileHeader from './components/ProfileHeader.js'
import { iconSize, spacing } from '../constants/dimensions.js'
import { colors } from './Constants.js'
import Feather from "react-native-vector-icons/Feather"

const Profile = () => {
  return (
    <View style={styles.container}>
      <ProfileHeader/>
      <View style={styles.profileImageContainer}>

        <Image source={require("../images/ProfileDp.jpg")} style={styles.profileImage}/>
      <TouchableOpacity style={styles.editIconContainer}>
         <Feather name={"edit-3"} size={iconSize.md} color={colors.iconwhite}/>
      </TouchableOpacity>
     
      </View>

      {/* PROFILE DETAILS CONTAINER**/}
      <View style={styles.nameRoleContainer}>
      <Text></Text>
      </View>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
   
  },
  profileImage: {
    height: 140,
    width: 140,
    borderRadius: 70, 
    
  },
  editIconContainer:{
    height:35,
    width:35,
    backgroundColor:colors.orange,
    borderRadius:15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:-30,
    marginLeft:45
  }
});

  

