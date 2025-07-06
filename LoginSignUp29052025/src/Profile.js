


// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ScrollView,
//   SafeAreaView,
//   Alert,
//   Modal,
//   PermissionsAndroid,
//   Platform,
//   Linking
// } from 'react-native';
// import React, {useState, useCallback} from 'react';
// import ProfileHeader from './components/ProfileHeader';
// import {fontSize, iconSize, spacing} from '../constants/dimensions';
// import {colors} from './Constants';
// import Feather from 'react-native-vector-icons/Feather';
// import {fontFamily} from '../constants/fontFamily';
// import CustomInput from './components/CustomInput';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [showImagePickerModal, setShowImagePickerModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [formData, setFormData] = useState({
//     firstName: 'Samazon',
//     lastName: 'User',
//     gender: 'Male',
//     email: 'samazon@example.com',
//     password: 'password123!',
//     mobile: '9876543210',
//   });


//   const checkPermission = async (permission) => {
//     if (Platform.OS === 'android') {
//       const status = await PermissionsAndroid.check(permission);
//       return status;
//     }
//     return true; // iOS permissions are handled by the picker itself
//   };

//   const requestPermission = async (permission, title, message) => {
//     if (Platform.OS === 'android') {
//       try {
//         // Check if permission is already granted
//         const hasPermission = await checkPermission(permission);
//         if (hasPermission) return true;
       
//         // Request permission if not granted
//         const granted = await PermissionsAndroid.request(permission, {
//           title,
//           message,
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         });
       
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true; // iOS doesn't require explicit permission requests
//   };


//   const handleImagePicker = useCallback(async (type) => {
//     setShowImagePickerModal(false);
   
//     let hasPermission = true;
//     let permissionType = null;
//     let permissionTitle = '';
//     let permissionMessage = '';
   
//     if (type === 'camera') {
//       permissionType = PermissionsAndroid.PERMISSIONS.CAMERA;
//       permissionTitle = 'Camera Permission';
//       permissionMessage = 'App needs access to your camera to take photos';
//     } else {
//       // Handle different storage permissions based on Android version
//       const apiLevel = Platform.constants?.Release || 0;
//       const isAndroid13OrHigher = parseInt(apiLevel) >= 13;
     
//       permissionType = isAndroid13OrHigher
//         ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
//         : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
     
//       permissionTitle = 'Storage Permission';
//       permissionMessage = 'App needs access to your storage to select photos';
//     }

//     hasPermission = await requestPermission(
//       permissionType,
//       permissionTitle,
//       permissionMessage
//     );

//     if (!hasPermission) {
//       Alert.alert(
//         'Permission Required',
//         permissionMessage,
//         [
//           {text: 'Cancel', style: 'cancel'},
//           {text: 'Open Settings', onPress: () => Linking.openSettings()}
//         ]
//       );
//       return;
//     }

//     // Launch image picker with appropriate options
//     const options = {
//       mediaType: 'photo',
//       quality: 1,
//       includeBase64: false,
//     };

//     try {
//       const response = type === 'camera'
//         ? await launchCamera(options)
//         : await launchImageLibrary(options);

//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         Alert.alert('Error', `ImagePicker Error: ${response.errorMessage}`);
//       } else if (response.assets && response.assets.length > 0) {
//         const source = { uri: response.assets[0].uri };
//         setSelectedImage(source);
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       Alert.alert('Error', 'Failed to select image');
//     }
//   }, []);

//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: 'Camera Permission',
//             message: 'App needs access to your camera',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           return true;
//         } else {
//           Alert.alert('Camera permission denied');
//           return false;
//         }
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true;
//   };

//   const requestStoragePermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       // For Android API 33+ we need READ_MEDIA_IMAGES permission
//       const apiLevel = Platform.constants['Release'];
//       const isAndroid13OrHigher = parseInt(apiLevel, 10) >= 33;
     
//       const permission = isAndroid13OrHigher
//         ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
//         : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

//       const granted = await PermissionsAndroid.request(permission, {
//         title: 'Storage Permission',
//         message: 'App needs access to your storage to select photos',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       });

//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         return true;
//       } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
//         Alert.alert('Permission denied', 'Storage permission was denied');
//       } else {
//         // User selected "Never ask again"
//         Alert.alert(
//           'Permission required',
//           'Storage permission is required to select photos. Please enable it in app settings.',
//           [
//             {text: 'Cancel', style: 'cancel'},
//             {text: 'Open Settings', onPress: () => Linking.openSettings()},
//           ]
//         );
//       }
//       return false;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   }
//   return true; // iOS doesn't need this permission
// };



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
//      <SafeAreaView style={styles.safeArea}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         keyboardShouldPersistTaps="handled">
//         <View style={styles.profileImageContainer}>
//           <Image
//             source={selectedImage || require('../images/ProfileDp.jpg')}
//             style={styles.profileImage}
//           />
//           {isEditing && (
//             <TouchableOpacity
//               style={styles.editIconContainer}
//               onPress={() => setShowImagePickerModal(true)}>
//               <Feather
//                 name={'edit-3'}
//                 size={iconSize.md}
//                 color={colors.iconwhite}
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

//         {/* Image Picker Modal */}
//        <Modal
//           visible={showImagePickerModal}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setShowImagePickerModal(false)}>
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Change Profile Photo</Text>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={() => handleImagePicker('camera')}>
//                 <Text style={styles.modalButtonText}>Take Photo</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={() => handleImagePicker('gallery')}>
//                 <Text style={styles.modalButtonText}>Choose from Gallery</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.modalButton, styles.cancelButton]}
//                 onPress={() => setShowImagePickerModal(false)}>
//                 <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancel</Text>
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
//     marginLeft: 45,
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
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   modalButton: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   modalButtonText: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   cancelButton: {
//     marginTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     borderBottomWidth: 0,
//   },
//   cancelButtonText: {
//     color: 'red',
//   },
// });

// export default Profile;

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
  Modal,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import ProfileHeader from './components/ProfileHeader';
import {fontSize, iconSize, spacing} from '../constants/dimensions';
import {colors} from './Constants';
import Feather from 'react-native-vector-icons/Feather';
import {fontFamily} from '../constants/fontFamily';
import CustomInput from './components/CustomInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: 'Samazon',
    lastName: 'User',
    gender: 'Male',
    email: 'samazon@example.com',
    password: 'password123!',
    mobile: '9876543210',
  });

  // Check if permission is already granted
  const checkPermission = async (permission) => {
    if (Platform.OS === 'android') {
      try {
        const status = await PermissionsAndroid.check(permission);
        return status;
      } catch (err) {
        console.warn('Permission check error:', err);
        return false;
      }
    }
    return true;
  };

  // Request only the necessary permissions
  const requestStoragePermission = async () => {
    if (Platform.OS !== 'android') return true;
   
    try {
      // Determine which permission to request based on Android version
      const apiLevel = Platform.constants?.Release || 0;
      const versionNumber = parseInt(apiLevel) || 0;
      const isAndroid13OrHigher = versionNumber >= 33;
     
      const permission = isAndroid13OrHigher
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      // Check if we already have permission
      const hasPermission = await checkPermission(permission);
      if (hasPermission) return true;

      // Request permission
      const result = await PermissionsAndroid.request(permission, {
        title: 'Storage Permission',
        message: 'App needs access to your storage to select photos',
        buttonPositive: 'OK',
      });

      return result === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Permission request error:', err);
      return false;
    }
  };

  const openGallery = async () => {
    try {
      // Always request permission before opening gallery
      const hasPermission = await requestStoragePermission();
     
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Storage permission is required to access your photos. Please enable it in app settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => Linking.openSettings()}
          ]
        );
        return;
      }

      // Open the gallery
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
        selectionLimit: 1,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error:', result.errorMessage);
        Alert.alert('Error', `Could not select image: ${result.errorMessage}`);
      } else if (result.assets && result.assets.length > 0) {
        const source = { uri: result.assets[0].uri };
        setSelectedImage(source);
      }
    } catch (error) {
      console.log('Gallery Error:', error);
      Alert.alert(
        'Error',
        'Could not open gallery. Please try again.',
        [{text: 'OK'}]
      );
    }
  };

  const openCamera = async () => {
    try {
      // Request camera permission
      if (Platform.OS === 'android') {
        const hasPermission = await checkPermission(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (!hasPermission) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs access to your camera',
              buttonPositive: 'OK',
            }
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Camera permission denied');
            return;
          }
        }
      }

      // Open camera
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      });

      if (result.didCancel) {
        console.log('User cancelled camera');
      } else if (result.errorCode) {
        console.log('Camera Error:', result.errorMessage);
        Alert.alert('Error', `Could not take photo: ${result.errorMessage}`);
      } else if (result.assets && result.assets.length > 0) {
        const source = { uri: result.assets[0].uri };
        setSelectedImage(source);
      }
    } catch (error) {
      console.log('Camera Error:', error);
      Alert.alert(
        'Error',
        'Could not open camera. Please try again.',
        [{text: 'OK'}]
      );
    }
  };

  const handleImagePicker = (type) => {
    setShowImagePickerModal(false);
    if (type === 'camera') {
      openCamera();
    } else {
      openGallery();
    }
  };

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
      (formData.mobile.length !== 10 || isNaN(formData.mobile))
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
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.profileImageContainer}>
          <Image
            source={selectedImage || require('../images/ProfileDp.jpg')}
            style={styles.profileImage}
          />
          {isEditing && (
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={() => setShowImagePickerModal(true)}>
              <Feather
                name={'edit-3'}
                size={iconSize.md}
                color={colors.iconwhite}
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

        {/* Image Picker Modal */}
        <Modal
          visible={showImagePickerModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowImagePickerModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Profile Photo</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleImagePicker('camera')}>
                <Text style={styles.modalButtonText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleImagePicker('gallery')}>
                <Text style={styles.modalButtonText}>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowImagePickerModal(false)}>
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancel</Text>
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
    marginLeft: 45,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 0,
  },
  cancelButtonText: {
    color: 'red',
  },
});

export default Profile;