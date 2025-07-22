import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {validateOtp, clearError} from './auth/authSlice';
import {useNavigation} from '@react-navigation/native';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {isLoading, error, loginId, isAuthenticated} = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{name: 'MainApp'}],
      });
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validateForm = () => {
    setOtpError('');
    
    if (!otp) {
      setOtpError('OTP is required');
      return false;
    }
    
    if (otp.length !== 6) {
      setOtpError('OTP must be 6 digits');
      return false;
    }
    
    if (!/^\d+$/.test(otp)) {
      setOtpError('OTP should contain only numbers');
      return false;
    }
    
    return true;
  };

  const handleVerifyOtp = () => {
    if (!validateForm()) return;
    
    if (!loginId) {
      Alert.alert('Error', 'Login ID not found. Please login again.');
      navigation.goBack();
      return;
    }

    dispatch(validateOtp({id: loginId, otp: otp}));
  };

  const handleResendOtp = () => {
    Alert.alert('Info', 'OTP resend functionality would be implemented here');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit OTP sent to your registered email
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>OTP</Text>
          <TextInput
            style={[styles.input, otpError ? styles.inputError : null]}
            value={otp}
            onChangeText={text => {
              setOtp(text);
              setOtpError('');
            }}
            keyboardType="numeric"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            placeholderTextColor="#999"
            textAlign="center"
            fontSize={20}
            letterSpacing={5}
          />
          {otpError ? (
            <Text style={styles.errorText}>{otpError}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          onPress={handleVerifyOtp}
          style={styles.verifyButton}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleResendOtp}
          style={styles.resendButton}>
          <Text style={styles.resendText}>Didn't receive OTP? Resend</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backText}>← Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 20,
    fontSize: 20,
    backgroundColor: '#fff',
    textAlign: 'center',
    letterSpacing: 5,
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendButton: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resendText: {
    color: '#007bff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  backButton: {
    alignItems: 'center',
  },
  backText: {
    color: '#666',
    fontSize: 14,
  },
});

export default OtpVerification;