import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Modal } from 'react-native';

export default function Loading({ visible }) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => { }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.text}>Waiting connection..</Text>
          <ActivityIndicator size="large" color="#3f51b5" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    width: '75%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: 'gray',
  }
});
