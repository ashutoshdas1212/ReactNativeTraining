import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import Btn from './Btn';

import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, validateOtp } from './redux/authSlice';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const registeredUsers = useSelector(state => state.auth.registeredUsers);
  const loginStatus = useSelector(state => state.auth.loginStatus);
  const loginError = useSelector(state => state.auth.loginError);
  const loginId = useSelector(state => state.auth.loginId);
  const otpStatus = useSelector(state => state.auth.otpStatus);
  const otpError = useSelector(state => state.auth.otpError);
  const [otp, setOtp] = useState('');

  const validateForm = () => {
    let isValid = true;

    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    // Only allow login for registered users
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      setIsLoading(false);
      Alert.alert('Error', 'You must register first.');
      return;
    }
    setIsLoading(true);
    dispatch(loginUser({ email, password }));
  };

  const handleOtpSubmit = () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter OTP');
      return;
    }
    dispatch(validateOtp({ id: loginId, otp }));
  };

  const handleRegister = () => {
    Alert.alert('Register', 'Registration would be handled here');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset would be handled here');
  };
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
        {/* Show OTP input if login succeeded and OTP not yet validated */}
        {loginStatus === 'succeeded' && otpStatus !== 'succeeded' ? (
          <>
            <Text style={{ marginVertical: 10 }}>Enter OTP sent to your email</Text>
            <TextInput
              style={[styles.input]}
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter OTP"
              keyboardType="numeric"
            />
            {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}
            <TouchableOpacity
              onPress={handleOtpSubmit}
              style={styles.loginButton}
              disabled={otpStatus === 'loading'}>
              {otpStatus === 'loading' ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Validate OTP</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  setEmailError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
                placeholderTextColor="#999"
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[styles.input, passwordError ? styles.inputError : null]}
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setPasswordError('');
                }}
                secureTextEntry={true}
                placeholder="Enter your password"
                placeholderTextColor="#999"
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>
            {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
            <TouchableOpacity
              onPress={handleLogin}
              style={styles.loginButton}
              disabled={isLoading || loginStatus === 'loading'}>
              {(isLoading || loginStatus === 'loading') ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          onPress={handleForgotPassword}
          style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
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
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#007bff',
    fontSize: 14,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signUpText: {
    color: '#666',
    marginRight: 4,
  },
  signUpLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default Login;
