// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'

// import Ionicons from "react-native-vector-icons/Ionicons"
// import Octicons from "react-native-vector-icons/Octicons"
// import { colors } from '../Constants'
// import { iconSize } from '../../constants/dimensions'

// const ProfileHeader = () => {
//   return (
//     <View style={styles.container}>
//     <TouchableOpacity>
// <Ionicons name={"arrow-back"} color={colors.iconPrimary} size={iconSize.md} />
//     </TouchableOpacity>
//        <TouchableOpacity>
//       <Octicons name={"gear"} color={"#000000"} size={iconSize.md} />
//       </TouchableOpacity>
//     </View>
//   )
// }

// export default ProfileHeader

// const styles = StyleSheet.create({

//   container:{
  
//     flexDirection:"row",
//       justifyContent:"space-between"

//   }

// })
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import { colors } from '../Constants';
import { iconSize } from '../../constants/dimensions';

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name={"arrow-back"} color={colors.iconPrimary} size={iconSize.md} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Octicons name={"gear"} color={"#000000"} size={iconSize.md} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
