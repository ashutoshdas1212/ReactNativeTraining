import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const App: React.FC = () => {
  const [modalVisible,setModalVisible]=useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
     
     <Button title="Open The Modal" onPress={()=>setModalVisible(true)} />
     <Modal
     visible={modalVisible}
     transparent
     animationType='slide'
     onRequestClose={()=>{setModalVisible(false)}}
     >
<View style={styles.modalContainer}>
    <View style={styles.modalBox}>
      <Text> This is modal</Text>
      <Button title="CLOSE" onPress={()=>setModalVisible(false)}/> 
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
    padding: 30,
    borderRadius: 10,
    elevation: 5,

  


  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
     
  },
  modalContainer:{
flex:1,
backgroundColor: '#00000088',
 justifyContent: 'center',
 alignItems: 'center'
  }
});

export default App;
