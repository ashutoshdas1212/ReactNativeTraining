import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Modal,
  StyleSheet, Alert, ScrollView, KeyboardAvoidingView,
  Platform
} from 'react-native';

const SignUp = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [tempGender, setTempGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileError, setMobileError] = useState('');

  const validateForm = () => {
    let isValid = true;

    setFirstNameError('');
    setLastNameError('');
    setGenderError('');
    setEmailError('');
    setPasswordError('');
    setMobileError('');

    if (!firstName) {
      setFirstNameError('First name is required');
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(firstName)) {
      setFirstNameError('First name should contain only letters');
      isValid = false;
    }

    if (!lastName) {
      setLastNameError('Last name is required');
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(lastName)) {
      setLastNameError('Last name should contain only letters');
      isValid = false;
    }

    if (!gender) {
      setGenderError('Gender is required');
      isValid = false;
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter');
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError('Password must contain at least one number');
      isValid = false;
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      setPasswordError('Password must contain at least one special character');
      isValid = false;
    }

    if (!mobile) {
      setMobileError('Mobile number is required');
      isValid = false;
    } else if (mobile.length !== 10 || isNaN(Number(mobile))) {
      setMobileError('Enter a valid 10-digit mobile number');
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      Alert.alert('Success', 'Registration Successful');
      props.navigation.navigate('Login');
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
                setGenderError('');
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Registration Form</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={[styles.input, firstNameError ? styles.inputError : null]}
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setFirstNameError('');
            }}
            autoCorrect={false}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => lastNameInput.focus()}
            blurOnSubmit={false}
          />
          {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            ref={(input) => { lastNameInput = input; }}
            style={[styles.input, lastNameError ? styles.inputError : null]}
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              setLastNameError('');
            }}
            autoCorrect={false}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => emailInput.focus()}
            blurOnSubmit={false}
          />
          {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <TouchableOpacity
            onPress={() => {
              setShowGenderModal(true);
              setGenderError('');
            }}
            style={[styles.input, genderError ? styles.inputError : null]}
          >
            <Text style={{ color: gender ? 'black' : '#aaa', fontSize: 16 }}>
              {gender || 'Select Gender'}
            </Text>
          </TouchableOpacity>
          {genderError ? <Text style={styles.errorText}>{genderError}</Text> : null}
        </View>

        {renderGenderModal()}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email ID</Text>
          <TextInput
            ref={(input) => { emailInput = input; }}
            style={[styles.input, emailError ? styles.inputError : null]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordInput.focus()}
            blurOnSubmit={false}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            ref={(input) => { passwordInput = input; }}
            style={[styles.input, passwordError ? styles.inputError : null]}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError('');
            }}
            secureTextEntry={true}
            placeholder="At least 8 characters with uppercase, number & special char"
            returnKeyType="next"
            onSubmitEditing={() => mobileInput.focus()}
            blurOnSubmit={false}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            ref={(input) => { mobileInput = input; }}
            style={[styles.input, mobileError ? styles.inputError : null]}
            keyboardType="numeric"
            value={mobile}
            onChangeText={(text) => {
              setMobile(text);
              setMobileError('');
            }}
            maxLength={10}
            returnKeyType="done"
            onSubmitEditing={handleRegister}
          />
          {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}
        </View>

        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
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
  inputError: {
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5
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
    marginTop: 20,
    marginBottom: 20
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default SignUp;