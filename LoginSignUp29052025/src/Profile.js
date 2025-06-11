

  

// import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
// import React from 'react';
// import ProfileHeader from './components/ProfileHeader.js';
// import { fontSize, iconSize, spacing } from '../constants/dimensions.js';
// import { colors } from './Constants.js';
// import Feather from 'react-native-vector-icons/Feather';
// import { fontFamily } from '../constants/fontFamily.js';
// import CustomInput from './components/CustomInput.js';

// const Profile = () => {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView 
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled"
//       >
//         <ProfileHeader/>
//         <View style={styles.profileImageContainer}>
//           <Image source={require("../images/ProfileDp.jpg")} style={styles.profileImage}/>
//           <TouchableOpacity style={styles.editIconContainer}>
//             <Feather name={"edit-3"} size={iconSize.md} color={colors.iconwhite}/>
//           </TouchableOpacity>
//         </View>
        
//         <View style={styles.nameRoleContainer}>
//           <Text style={styles.name}>Samazon</Text>
//         </View>

//         <View style={styles.inputFieldsContainer}>
//           <CustomInput/>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff' // or your preferred background color
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     padding: spacing.md,
//   },
//   profileImageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   profileImage: {
//     height: 140,
//     width: 140,
//     borderRadius: 70,
//   },
//   editIconContainer: {
//     height: 35,
//     width: 35,
//     backgroundColor: colors.orange,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: -30,
//     marginLeft: 45
//   },
//   nameRoleContainer: {
//     alignItems: "center",
//     marginVertical: spacing.sm
//   },
//   name: {
//     fontFamily: fontFamily.semiBold,
//     fontSize: fontSize.lg,
//     color: colors.textPrimary
//   },
//   inputFieldsContainer: {
//     marginBottom: 20 // Adjust as needed
//   }
// });

// export default Profile;

import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import React,{useState} from 'react';
import ProfileHeader from './components/ProfileHeader.js';
import { fontSize, iconSize, spacing } from '../constants/dimensions.js';
import { colors } from './Constants.js';
import Feather from 'react-native-vector-icons/Feather';
import { fontFamily } from '../constants/fontFamily.js';
import CustomInput from './components/CustomInput.js';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditPress = (field) => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
    Alert.alert('Success', 'Changes saved successfully');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <ProfileHeader/>
        <View style={styles.profileImageContainer}>
          <Image source={require("../images/ProfileDp.jpg")} style={styles.profileImage}/>
          <TouchableOpacity style={styles.editIconContainer}>
            <Feather name={"edit-3"} size={iconSize.md} color={colors.iconwhite}/>
          </TouchableOpacity>
        </View>
       
        <View style={styles.nameRoleContainer}>
          <Text style={styles.name}>Samazon</Text>
        </View>
       
        <View style={styles.inputFieldsContainer}>
          <CustomInput
            isEditable={isEditing}
            onEditPress={handleEditPress}
            onSave={handleSave}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    flexGrow: 1,
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
  editIconContainer: {
    height: 35,
    width: 35,
    backgroundColor: colors.orange,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    marginLeft: 45
  },
  nameRoleContainer: {
    alignItems: "center",
    marginVertical: spacing.sm
  },
  name: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.lg,
    color: colors.textPrimary
  },
  inputFieldsContainer: {
    marginBottom: 20
  }
});

export default Profile;