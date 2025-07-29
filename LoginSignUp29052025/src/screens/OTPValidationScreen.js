import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {validateOTP} from '../redux/authSlice';
import {useNavigation} from '@react-navigation/native';

const OTPValidationScreen = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {id, loading, error} = useSelector(state => state.auth);

  const handleValidateOTP = () => {
    if (otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }
    dispatch(validateOTP({id, otp}))
      .unwrap().then(() => {
        navigation.replace('MainDrawer');
      })
      .catch(err => {
        Alert.alert('Error', err || 'OTP validation failed');
      });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit OTP sent to your email address
        </Text>
        <View style={styles.otpInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="_ _ _ _ _ _"
            keyboardType="numeric"
            inputMode="numeric"
            returnKeyType="done"
            value={otp}
            onChangeText={setOtp}
            maxLength={6}
            textAlign="center"
            autoFocus
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={styles.button}
          onPress={handleValidateOTP}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.resendText}>
          Didn't receive the code? Check your spam folder or wait a few moments.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f7f8fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: '60%',
  },
  input: {
    borderWidth: 2,
    borderColor: '#007bff',
    borderRadius: 10,
    padding: 15,
    fontSize: 24,
    backgroundColor: '#fff',
    width: '100%',
    letterSpacing: 20,
    color: '#222',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#007bff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  resendText: {
    color: '#888',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    width: '80%',
  },
});

export default OTPValidationScreen;
