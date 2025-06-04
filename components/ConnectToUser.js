import { StyleSheet, Text, View, Modal,TextInput,Pressable } from 'react-native'
import React from 'react'
import { useState } from 'react';
export default function ConnectToUser({ visible,onSubmit }) {
    const [codeInput, setCodeInput] = useState('');
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {

            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Enter Love Code:</Text>
                    <TextInput style={styles.textInput}
                        value={codeInput}
                        onChangeText={setCodeInput}
                        placeholder='#0000' />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => onSubmit(codeInput)}>
                        <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'gray',
    }, 
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '60%',
    },
    buttonClose: {
        backgroundColor: '#fb2235',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textInput: {
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        width: '100%',
        borderRadius: 20,
    }
})