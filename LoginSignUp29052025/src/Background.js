import React from 'react';
import {View, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';

const Background = ({children}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/abstract.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // Optional: adds a slight dark overlay
  },
});

export default Background;