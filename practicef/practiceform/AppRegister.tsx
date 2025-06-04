import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Modal,
  StyleSheet, Alert, ScrollView, SafeAreaView
} from 'react-native';
 
const App = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [tempGender, setTempGender] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
 
  const validateForm = () => {
    if (!firstName || !lastName || !gender || !dob || !mobile) {
      Alert.alert('Validation Error', 'all fields are required');
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(firstName)) {
      Alert.alert('Validation Error', 'first Name contain only letters');
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(lastName)) {
      Alert.alert('Validation Error', 'last Name  contain only letters');
      return false;
    }
    if (mobile.length !== 10 || isNaN(Number(mobile))) {
      Alert.alert('Validation Error', 'enter a valid 10-digit mobile number');
      return false;
    }
    return true;
  };
 
  const handleRegister = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Registration Successful');
    }
  };
 
  const renderGenderModal = () => (
    <Modal transparent visible={showGenderModal} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.bottomSheet}>
          <Text style={styles.modalTitle}>Select Gender</Text>
          {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setTempGender(option)}
              style={[
                styles.modalOptionBox,
                tempGender === option && styles.selectedOptionBox
              ]}
            >
              <Text
                style={[
                  styles.modalOption,
                  tempGender === option && styles.selectedOptionText
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
 
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => {
                setGender(tempGender);
                setShowGenderModal(false);
              }}
              style={styles.confirmButton}
            >
              <Text style={[styles.buttonText, { color: 'white' }]}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowGenderModal(false)}
              style={styles.cancelButton}
            >
              <Text style={[styles.buttonText, { color: 'black' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Registration Form</Text>
 
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
 
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
 
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <TouchableOpacity
            onPress={() => setShowGenderModal(true)}
            style={styles.input}
          >
            <Text style={{ color: gender ? 'black' : '#aaa', fontSize: 16 }}>
              {gender || 'Select Gender'}
            </Text>
          </TouchableOpacity>
        </View>
 
        {renderGenderModal()}
 
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Birth (DD-MM-YYYY)</Text>
          <TextInput
            style={styles.input}
            value={dob}
            onChangeText={setDob}
          />
        </View>
 
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={mobile}
            onChangeText={setMobile}
            maxLength={10}
          />
        </View>
 
        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    alignSelf: 'center'
  },
  inputGroup: {
    marginBottom: 15
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000'
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000066'
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center'
  },
  modalOptionBox: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f0f0f0'
  },
  selectedOptionBox: {
    backgroundColor: '#cce5ff'
  },
  modalOption: {
    fontSize: 16
  },
  selectedOptionText: {
    fontWeight: 'bold',
    color: '#004085'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  confirmButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center'
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold'
  },
  registerButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 300
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
 
export default App;