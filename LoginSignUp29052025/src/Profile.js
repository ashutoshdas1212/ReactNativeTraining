// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Modal,
//   PermissionsAndroid,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import CustomInput from './components/CustomInput';
// import ProfileHeader from './components/ProfileHeader';
// import { fontSize, iconSize, spacing } from '../constants/dimensions';
// import { fontFamily } from '../constants/fontFamily';
// import { colors } from './Constants';
// import ImagePicker from 'react-native-image-crop-picker';


// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// const Profile = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [imagePickerVisible, setImagePickerVisible] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: 'Samazon',
//     lastName: 'User',
//     gender: 'Male',
//     email: 'samazon@example.com',
//     password: 'password123!',
//     mobile: '9876543210',
//   });


//   const requestCameraPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: "Camera Permission",
//           message: "App needs access to your camera",
//           buttonPositive: "OK"
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };


//   const requestStoragePermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         {
//           title: "Storage Permission",
//           message: "App needs access to your storage",
//           buttonPositive: "OK"
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };


//   // const openCamera = useCallback(async () => {
//   //   setImagePickerVisible(false);
   
//   //   const hasCameraPermission = await requestCameraPermission();
//   //   if (!hasCameraPermission) {
//   //     Alert.alert('Permission denied', 'Camera permission is required');
//   //     return;
//   //   }

//   //   const options = {
//   //     mediaType: 'photo',
//   //     maxWidth: 500,
//   //     maxHeight: 500,
//   //     quality: 0.8,
//   //   };

//   //   launchCamera(options, (response) => {
//   //     if (response.didCancel) {
//   //       return;
//   //     } else if (response.errorCode) {
//   //       Alert.alert('Error', `Camera error: ${response.errorMessage}`);
//   //     } else if (response.assets && response.assets.length > 0) {
//   //       setSelectedImage(response.assets[0].uri);
//   //     }
//   //   });
//   // }, []);


//   // const openGallery = useCallback(async () => {
//   //   setImagePickerVisible(false);
   
//   //   const hasStoragePermission = await requestStoragePermission();
//   //   if (!hasStoragePermission) {
//   //     Alert.alert('Permission denied', 'Storage permission is required');
//   //     return;
//   //   }

//   //   try {
//   //     const image = await ImagePicker.openPicker({
//   //       mediaType: 'photo',
//   //       cropping: true,
//   //       cropperCircleOverlay: true,
//   //       width: 300,
//   //       height: 300,
//   //       compressImageQuality: 0.8,
//   //     });
     
//   //     setSelectedImage(image.path);
//   //   } catch (error) {
//   //     if (error.code !== 'E_PICKER_CANCELLED') {
//   //       Alert.alert('Error', `Gallery error: ${error.message}`);
//   //     }
//   //   }
//   // }, []);

//   const validateForm = useCallback(() => {
//     if (!formData.firstName.trim()) {
//       Alert.alert('Error', 'First name is required');
//       return false;
//     }
//     if (
//       !formData.email.trim() ||
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
//     ) {
//       Alert.alert('Error', 'Please enter a valid email');
//       return false;
//     }
//     if (
//       formData.mobile &&
//       (formData.mobile.length !== 10 || isNaN(formData.mobile))
//     ) {
//       Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
//       return false;
//     }
//     return true;
//   }, [formData]);

//   const handleEditPress = useCallback(() => {
//     setIsEditing(!isEditing);
//   }, [isEditing]);

//   const handleSave = useCallback(() => {
//     if (validateForm()) {
//       setIsEditing(false);
//       Alert.alert('Success', 'Profile updated successfully');
//     }
//   }, [validateForm]);

//   const handleFieldChange = useCallback((field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value,
//     }));
//   }, []);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <ProfileHeader />
//         <View style={styles.profileImageContainer}>
//           <Image
//             source={
//               selectedImage
//                 ? { uri: selectedImage }
//                 : require('../images/ProfileDp.jpg')
//             }
//             style={styles.profileImage}
//           />
//           {isEditing && (
//             <TouchableOpacity
//               style={styles.editIconOverlay}
//               onPress={() => setImagePickerVisible(true)}
//             >
//               <Ionicons
//                 name="pencil"
//                 size={iconSize.sm}
//                 color="white"
//               />
//             </TouchableOpacity>
//           )}
//         </View>

//         <View style={styles.headerContainer}>
//           <Text style={styles.name}>{formData.firstName}</Text>
//           <TouchableOpacity onPress={handleEditPress}>
//             <Ionicons
//               name={isEditing ? 'close' : 'pencil'}
//               size={iconSize.md}
//               color={colors.orange}
//             />
//           </TouchableOpacity>
//         </View>

//         <CustomInput
//           isEditable={isEditing}
//           formData={formData}
//           onFieldChange={handleFieldChange}
//         />

//         {isEditing && (
//           <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
//             <Text style={styles.saveButtonText}>Save Changes</Text>
//           </TouchableOpacity>
//         )}

    
//         <Modal
//           visible={imagePickerVisible}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setImagePickerVisible(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.bottomSheet}>
//               <View style={styles.sheetHandle} />
             
//               <Text style={styles.sheetTitle}>Change Profile Photo</Text>
             
//               <TouchableOpacity
//                 style={styles.sheetOption}
//                 onPress={openCamera}
//               >
//                 <Feather name="camera" size={24} color={colors.textPrimary} />
//                 <Text style={styles.sheetOptionText}>Take Photo</Text>
//               </TouchableOpacity>
             
//               <TouchableOpacity
//                 style={styles.sheetOption}
//                 onPress={openGallery}
//               >
//                 <Feather name="image" size={24} color={colors.textPrimary} />
//                 <Text style={styles.sheetOptionText}>Choose from Gallery</Text>
//               </TouchableOpacity>
             
//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={() => setImagePickerVisible(false)}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     padding: spacing.md,
//   },
//   profileImageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     position: 'relative',
//   },
//   profileImage: {
//     height: 140,
//     width: 140,
//     borderRadius: 70,
//   },
//   editIconOverlay: {
//     position: 'absolute',
//     bottom: 5,
//     right: 5,
//     backgroundColor: colors.orange,
//     borderRadius: 15,
//     padding: 5,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   name: {
//     fontFamily: fontFamily.semiBold,
//     fontSize: fontSize.lg,
//     color: colors.textPrimary,
//   },
//   saveButton: {
//     backgroundColor: colors.orange,
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//     marginHorizontal: 20,
//   },
//   saveButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'flex-end',
//   },
//   bottomSheet: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//     paddingBottom: 30,
//   },
//   sheetHandle: {
//     width: 40,
//     height: 5,
//     backgroundColor: '#ccc',
//     borderRadius: 2.5,
//     alignSelf: 'center',
//     marginVertical: 10,
//   },
//   sheetTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   sheetOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   sheetOptionText: {
//     marginLeft: 15,
//     fontSize: 16,
//   },
//   cancelButton: {
//     marginTop: 20,
//     padding: 15,
//     borderRadius: 8,
//     backgroundColor: '#f5f5f5',
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     color: colors.orange,
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default Profile;

// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Modal,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import CustomInput from './components/CustomInput';
// import ProfileHeader from './components/ProfileHeader';
// import { fontSize, iconSize, spacing } from '../constants/dimensions';
// import { fontFamily } from '../constants/fontFamily';
// import { colors } from './Constants';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// const Profile = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [imagePickerVisible, setImagePickerVisible] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: 'Samazon',
//     lastName: 'User',
//     gender: 'Male',
//     email: 'samazon@example.com',
//     password: 'password123!',
//     mobile: '9876543210',
//   });

//   // Request camera permission for Android
//   const requestCameraPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: "Camera Permission",
//           message: "App needs access to your camera",
//           buttonPositive: "OK"
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };

//   // Request storage permission for Android
//   const requestStoragePermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         {
//           title: "Storage Permission",
//           message: "App needs access to your storage",
//           buttonPositive: "OK"
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };

//   // Open camera using react-native-image-picker
//   const openCamera = useCallback(async () => {
//     setImagePickerVisible(false);
   
//     // For Android, request camera permission
//     if (Platform.OS === 'android') {
//       const hasCameraPermission = await requestCameraPermission();
//       if (!hasCameraPermission) {
//         Alert.alert('Permission denied', 'Camera permission is required');
//         return;
//       }
//     }

//     const options = {
//       mediaType: 'photo',
//       maxWidth: 500,
//       maxHeight: 500,
//       quality: 0.8,
//       saveToPhotos: true,
//       includeBase64: false,
//     };

//     launchCamera(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled camera');
//       } else if (response.errorCode) {
//         Alert.alert('Error', `Camera error: ${response.errorMessage}`);
//       } else if (response.assets && response.assets.length > 0) {
//         setSelectedImage(response.assets[0].uri);
//       }
//     });
//   }, []);

//   // Open gallery using react-native-image-picker
//   const openGallery = useCallback(async () => {
//     setImagePickerVisible(false);
   
//     // For Android, request storage permission
//     if (Platform.OS === 'android') {
//       const hasStoragePermission = await requestStoragePermission();
//       if (!hasStoragePermission) {
//         Alert.alert('Permission denied', 'Storage permission is required');
//         return;
//       }
//     }

//     const options = {
//       mediaType: 'photo',
//       maxWidth: 500,
//       maxHeight: 500,
//       quality: 0.8,
//       includeBase64: false,
//     };

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         Alert.alert('Error', `Gallery error: ${response.errorMessage}`);
//       } else if (response.assets && response.assets.length > 0) {
//         setSelectedImage(response.assets[0].uri);
//       }
//     });
//   }, []);

//   const validateForm = useCallback(() => {
//     if (!formData.firstName.trim()) {
//       Alert.alert('Error', 'First name is required');
//       return false;
//     }
//     if (
//       !formData.email.trim() ||
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
//     ) {
//       Alert.alert('Error', 'Please enter a valid email');
//       return false;
//     }
//     if (
//       formData.mobile &&
//       (formData.mobile.length !== 10 || isNaN(formData.mobile))
//     ) {
//       Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
//       return false;
//     }
//     return true;
//   }, [formData]);

//   const handleEditPress = useCallback(() => {
//     setIsEditing(!isEditing);
//   }, [isEditing]);

//   const handleSave = useCallback(() => {
//     if (validateForm()) {
//       setIsEditing(false);
//       Alert.alert('Success', 'Profile updated successfully');
//     }
//   }, [validateForm]);

//   const handleFieldChange = useCallback((field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value,
//     }));
//   }, []);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <ProfileHeader />
//         <View style={styles.profileImageContainer}>
//           <Image
//             source={
//               selectedImage
//                 ? { uri: selectedImage }
//                 : require('../images/ProfileDp.jpg')
//             }
//             style={styles.profileImage}
//           />
//           {isEditing && (
//             <TouchableOpacity
//               style={styles.editIconOverlay}
//               onPress={() => setImagePickerVisible(true)}
//             >
//               <Ionicons
//                 name="pencil"
//                 size={iconSize.sm}
//                 color="white"
//               />
//             </TouchableOpacity>
//           )}
//         </View>

//         <View style={styles.headerContainer}>
//           <Text style={styles.name}>{formData.firstName}</Text>
//           <TouchableOpacity onPress={handleEditPress}>
//             <Ionicons
//               name={isEditing ? 'close' : 'pencil'}
//               size={iconSize.md}
//               color={colors.orange}
//             />
//           </TouchableOpacity>
//         </View>

//         <CustomInput
//           isEditable={isEditing}
//           formData={formData}
//           onFieldChange={handleFieldChange}
//         />

//         {isEditing && (
//           <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
//             <Text style={styles.saveButtonText}>Save Changes</Text>
//           </TouchableOpacity>
//         )}

//         {/* Bottom Sheet Modal */}
//         <Modal
//           visible={imagePickerVisible}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setImagePickerVisible(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.bottomSheet}>
//               <View style={styles.sheetHandle} />
             
//               <Text style={styles.sheetTitle}>Change Profile Photo</Text>
             
//               <TouchableOpacity
//                 style={styles.sheetOption}
//                 onPress={openCamera}
//               >
//                 <Feather name="camera" size={24} color={colors.textPrimary} />
//                 <Text style={styles.sheetOptionText}>Take Photo</Text>
//               </TouchableOpacity>
             
//               <TouchableOpacity
//                 style={styles.sheetOption}
//                 onPress={openGallery}
//               >
//                 <Feather name="image" size={24} color={colors.textPrimary} />
//                 <Text style={styles.sheetOptionText}>Choose from Gallery</Text>
//               </TouchableOpacity>
             
//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={() => setImagePickerVisible(false)}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     padding: spacing.md,
//   },
//   profileImageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     position: 'relative',
//   },
//   profileImage: {
//     height: 140,
//     width: 140,
//     borderRadius: 70,
//   },
//   editIconOverlay: {
//     position: 'absolute',
//     bottom: 5,
//     right: 5,
//     backgroundColor: colors.orange,
//     borderRadius: 15,
//     padding: 5,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   name: {
//     fontFamily: fontFamily.semiBold,
//     fontSize: fontSize.lg,
//     color: colors.textPrimary,
//   },
//   saveButton: {
//     backgroundColor: colors.orange,
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//     marginHorizontal: 20,
//   },
//   saveButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   // Bottom sheet styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'flex-end',
//   },
//   bottomSheet: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//     paddingBottom: 30,
//   },
//   sheetHandle: {
//     width: 40,
//     height: 5,
//     backgroundColor: '#ccc',
//     borderRadius: 2.5,
//     alignSelf: 'center',
//     marginVertical: 10,
//   },
//   sheetTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   sheetOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   sheetOptionText: {
//     marginLeft: 15,
//     fontSize: 16,
//   },
//   cancelButton: {
//     marginTop: 20,
//     padding: 15,
//     borderRadius: 8,
//     backgroundColor: '#f5f5f5',
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     color: colors.orange,
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default Profile;



import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  PermissionsAndroid,
  Platform,
  Linking,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import CustomInput from './components/CustomInput';
import ProfileHeader from './components/ProfileHeader';
import { fontSize, iconSize, spacing } from '../constants/dimensions';
import { fontFamily } from '../constants/fontFamily';
import { colors } from './Constants';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Samazon',
    lastName: 'User',
    gender: 'Male',
    email: 'samazon@example.com',
    password: 'password123!',
    mobile: '9876543210',
  });


  const requestAndroidPermission = async (permissionType) => {
    try {
      let permission;
     
      if (permissionType === 'camera') {
        permission = PermissionsAndroid.PERMISSIONS.CAMERA;
      } else {
      
        permission = Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      }

      const granted = await PermissionsAndroid.request(permission, {
        title: `${permissionType === 'camera' ? 'Camera' : 'Storage'} Permission`,
        message: `App needs access to your ${permissionType === 'camera' ? 'camera' : 'storage'}`,
        buttonPositive: 'OK',
      });

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error(`${permissionType} permission error:`, err);
      return false;
    }
  };

  const handlePermissionError = (permissionType) => {
    Alert.alert(
      'Permission Required',
      `Please enable ${permissionType} permission in app settings`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings()
        }
      ]
    );
  };

  const openCamera = useCallback(async () => {
    setImagePickerVisible(false);
    setIsLoading(true);

    try {
 
      if (Platform.OS === 'android') {
        const hasPermission = await requestAndroidPermission('camera');
        if (!hasPermission) {
          handlePermissionError('camera');
          setIsLoading(false);
          return;
        }
      }

      const options = {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      };

      launchCamera(options, (response) => {
        setIsLoading(false);
       
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          Alert.alert('Error', `Camera error: ${response.errorMessage}`);
        } else if (response.assets && response.assets.length > 0) {
          setSelectedImage(response.assets[0].uri);
        }
      });
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to open camera');
    }
  }, []);

  const openGallery = useCallback(async () => {
    setImagePickerVisible(false);
    setIsLoading(true);

    try {

      if (Platform.OS === 'android') {
        const hasPermission = await requestAndroidPermission('storage');
        if (!hasPermission) {
          handlePermissionError('storage');
          setIsLoading(false);
          return;
        }
      }

      const options = {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      };

      launchImageLibrary(options, (response) => {
        setIsLoading(false);
       
        if (response.didCancel) {
          console.log('User cancelled gallery');
        } else if (response.errorCode) {
          Alert.alert('Error', `Gallery error: ${response.errorMessage}`);
        } else if (response.assets && response.assets.length > 0) {
          setSelectedImage(response.assets[0].uri);
        }
      });
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to open gallery');
    }
  }, []);

  const validateForm = useCallback(() => {
    if (!formData.firstName.trim()) {
      Alert.alert('Error', 'First name is required');
      return false;
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      Alert.alert('Error', 'Please enter a valid email');
      return false;
    }
    if (
      formData.mobile &&
      (formData.mobile.length !== 10 || isNaN(Number(formData.mobile)))
    ) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return false;
    }
    return true;
  }, [formData]);

  const handleEditPress = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  const handleSave = useCallback(() => {
    if (validateForm()) {
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    }
  }, [validateForm]);

  const handleFieldChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ProfileHeader />
       
        <View style={styles.profileImageContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.orange} />
            </View>
          ) : (
            <Image
              source={
                selectedImage
                  ? { uri: selectedImage }
                  : require('../images/ProfileDp.jpg')
              }
              style={styles.profileImage}
            />
          )}
         
          {isEditing && !isLoading && (
            <TouchableOpacity
              style={styles.editIconOverlay}
              onPress={() => setImagePickerVisible(true)}
            >
              <Ionicons
                name="pencil"
                size={iconSize.sm}
                color="white"
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.name}>{formData.firstName}</Text>
          <TouchableOpacity onPress={handleEditPress}>
            <Ionicons
              name={isEditing ? 'close' : 'pencil'}
              size={iconSize.md}
              color={colors.orange}
            />
          </TouchableOpacity>
        </View>

        <CustomInput
          isEditable={isEditing}
          formData={formData}
          onFieldChange={handleFieldChange}
        />

        {isEditing && (
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}

 
        <Modal
          visible={imagePickerVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setImagePickerVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.bottomSheet}>
              <View style={styles.sheetHandle} />
             
              <Text style={styles.sheetTitle}>Change Profile Photo</Text>
             
              <TouchableOpacity
                style={styles.sheetOption}
                onPress={openCamera}
              >
                <Feather name="camera" size={24} color={colors.textPrimary} />
                <Text style={styles.sheetOptionText}>Take Photo</Text>
              </TouchableOpacity>
             
              <TouchableOpacity
                style={styles.sheetOption}
                onPress={openGallery}
              >
                <Feather name="image" size={24} color={colors.textPrimary} />
                <Text style={styles.sheetOptionText}>Choose from Gallery</Text>
              </TouchableOpacity>
             
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setImagePickerVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: spacing.md,
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
  },
  editIconOverlay: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: colors.orange,
    borderRadius: 15,
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  saveButton: {
    backgroundColor: colors.orange,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    height: 140,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  sheetHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sheetOptionText: {
    marginLeft: 15,
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.orange,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Profile;