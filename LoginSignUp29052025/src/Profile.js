import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView, Alert } from 'react-native';
import React, {useState} from 'react';
import ProfileHeader from './components/ProfileHeader';
import { fontSize, iconSize, spacing } from '../constants/dimensions';
import { colors } from './Constants';
import Feather from 'react-native-vector-icons/Feather';
import { fontFamily } from '../constants/fontFamily';
import CustomInput from './components/CustomInput';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Samazon',
    lastName: 'User',
    gender: 'Male',
    email: 'samazon@example.com',
    password: 'password123!',
    mobile: '9876543210'
  });

  const validateForm = () => {
    // Basic validation - you can expand this
    if (!formData.firstName.trim()) {
      Alert.alert('Error', 'First name is required');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return false;
    }
    if (formData.mobile && (formData.mobile.length !== 10 || isNaN(formData.mobile))) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return false;
    }
    return true;
  };

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
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
          {isEditing && (
            <TouchableOpacity style={styles.editIconContainer}>
              <Feather name={"edit-3"} size={iconSize.md} color={colors.iconwhite}/>
            </TouchableOpacity>
          )}
        </View>
       
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{formData.firstName}</Text>
          <TouchableOpacity onPress={handleEditPress}>
            <Ionicons
              name={isEditing ? "close" : "pencil"}
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
      </ScrollView>
    </SafeAreaView>
  );
};

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
    alignItems: 'center',
    marginBottom: 20
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  name: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.lg,
    color: colors.textPrimary
  },
  saveButton: {
    backgroundColor: colors.orange,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Profile;