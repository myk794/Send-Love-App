import React from 'react';
import { View, ActivityIndicator, StyleSheet,Text,Modal } from 'react-native';

export default function Loading({visible}) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
            <Text style={styles.text}>Loading..</Text>
          <ActivityIndicator size="large" color="#3f51b5" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text:{
    color: 'gray',
  }
});
