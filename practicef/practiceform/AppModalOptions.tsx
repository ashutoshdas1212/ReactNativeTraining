import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionSelect = (option: string) => {
    console.log('Selected:', option);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Open Options" onPress={() => setModalVisible(true)} />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Choose an Option</Text>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect('Option 1')}
            >
              <Text style={styles.optionText}>Option 1</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect('Option 2')}
            >
              <Text style={styles.optionText}>Option 2</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect('Option 3')}
            >
              <Text style={styles.optionText}>Option 3</Text>
            </TouchableOpacity>

            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
});

export default App;
