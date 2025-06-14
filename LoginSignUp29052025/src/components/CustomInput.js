import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../Constants';
import {iconSize} from '../../constants/dimensions';

const CustomInput = ({isEditable, formData, onFieldChange}) => {
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [tempGender, setTempGender] = useState('');
  const [errors, setErrors] = useState({});
  const [editingField, setEditingField] = useState(null);

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'firstName':
        if (!value) error = 'First name is required';
        else if (!/^[A-Za-z\s]+$/.test(value))
          error = 'First name should contain only letters';
        break;
      case 'lastName':
        if (value && !/^[A-Za-z\s]+$/.test(value))
          error = 'Last name should contain only letters';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = 'Enter a valid email address';
        break;
      case 'password':
        if (value && value.length < 8)
          error = 'Password must be at least 8 characters';
        else if (value && !/[A-Z]/.test(value))
          error = 'Password must contain at least one uppercase letter';
        else if (value && !/[0-9]/.test(value))
          error = 'Password must contain at least one number';
        else if (value && !/[^A-Za-z0-9]/.test(value))
          error = 'Password must contain at least one special character';
        break;
      case 'mobile':
        if (value && (value.length !== 10 || isNaN(Number(value))))
          error = 'Enter a valid 10-digit mobile number';
        break;
    }

    setErrors({
      ...errors,
      [field]: error,
    });

    return !error;
  };

  const handleChange = (field, value) => {
    onFieldChange(field, value);
    validateField(field, value);
  };

  const handleFieldEdit = field => {
    setEditingField(field === editingField ? null : field);
  };

  const renderGenderModal = () => (
    <Modal transparent visible={showGenderModal} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.bottomSheet}>
          <Text style={styles.modalTitle}>Select Gender</Text>
          {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(option => (
            <TouchableOpacity
              key={option}
              onPress={() => setTempGender(option)}
              style={[
                styles.modalOptionBox,
                tempGender === option && styles.selectedOptionBox,
              ]}>
              <Text
                style={[
                  styles.modalOption,
                  tempGender === option && styles.selectedOptionText,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => {
                handleChange('gender', tempGender);
                setShowGenderModal(false);
                setEditingField(null);
              }}
              style={styles.confirmButton}>
              <Text style={[styles.buttonText, {color: 'white'}]}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowGenderModal(false)}
              style={styles.cancelButton}>
              <Text style={[styles.buttonText, {color: 'black'}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderField = (label, field, isSecure = false) => (
    <View style={styles.inputGroup}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {isEditable && (
          <TouchableOpacity onPress={() => handleFieldEdit(field)}>
            <Ionicons
              name={editingField === field ? 'close' : 'pencil'}
              size={iconSize.sm}
              color={colors.orange}
            />
          </TouchableOpacity>
        )}
      </View>

      {editingField === field ? (
        <>
          {field === 'gender' ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  setTempGender(formData.gender);
                  setShowGenderModal(true);
                }}
                style={[styles.input, errors.gender && styles.inputError]}>
                <Text
                  style={{
                    color: formData.gender ? 'black' : '#aaa',
                    fontSize: 16,
                  }}>
                  {formData.gender || 'Select Gender'}
                </Text>
              </TouchableOpacity>
              {renderGenderModal()}
            </>
          ) : (
            <TextInput
              style={[styles.input, errors[field] && styles.inputError]}
              value={formData[field]}
              onChangeText={text => handleChange(field, text)}
              secureTextEntry={isSecure}
              placeholder={`Enter your ${label.toLowerCase()}`}
              keyboardType={field === 'mobile' ? 'numeric' : 'default'}
              autoCapitalize={field === 'email' ? 'none' : 'words'}
            />
          )}
          {errors[field] && (
            <Text style={styles.errorText}>{errors[field]}</Text>
          )}
        </>
      ) : (
        <Text style={styles.displayText}>
          {isSecure ? '••••••••' : formData[field] || 'Not provided'}
        </Text>
      )}
    </View>
  );

  return (
    <View>
      {renderField('First Name', 'firstName')}
      {renderField('Last Name', 'lastName')}
      {renderField('Gender', 'gender')}
      {renderField('Email ID', 'email')}
      {renderField('Password', 'password', true)}
      {renderField('Mobile Number', 'mobile')}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 15,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 5,
  },
  displayText: {
    fontSize: 16,
    padding: 10,
    color: '#000',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000066',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  modalOptionBox: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedOptionBox: {
    backgroundColor: '#cce5ff',
  },
  modalOption: {
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: 'bold',
    color: '#004085',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default CustomInput;
