import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';

const RedScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Button title="Press Me" onPress={() => Alert.alert('Button Pressed')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RedScreen;