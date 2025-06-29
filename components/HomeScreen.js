
import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, Button, ActivityIndicator, TouchableOpacity, Modal, Pressable, TextInput } from 'react-native';
import { auth, signInAnonymously, onAuthStateChanged, database } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import { getUser, saveUsertoDatabase, ConnectToUserDB,getUserNameByID4 } from '../backend/database';
import ConnectToUser from './ConnectToUser';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function HomeScreen() {
    const [loading, setLoading] = useState(false);
    const [id4, setId4] = useState(null);
    const [connected, setConnected] = useState(false);
    const [nameInputModal, setNameInputModal] = useState(false);
    const [userName, setUserName] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [recievedLove, setRecievedLove] = useState('0');
    const [connectUserModal, setConnectUserModal] = useState(false);
    const [userTokenID, setUserTokenID] = useState('');
    const [myUid, setMyUid] = useState('');
    const [yourLoveName, setYourLoveName] = useState('Your Love Name');


    useEffect(() => {
        setLoading(false);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(true);
            if (!user) {
                setNameInputModal(true);
            } else {
                
                console.log('Zaten giriş yapmış (Already signed in):', user.uid);
                setMyUid(user.uid);
                user.getIdToken().then((idToken) => {
                    setUserTokenID(idToken);
                    getUser(idToken, user.uid).then(id => {
                        setId4(id);
                        console.log(id);
                    }).catch(error => {
                        console.error('Hata:', error);
                    });


                });






            }
            setLoading(false);

        });

        return unsubscribe;
    }, []);
    const toastConfig = {
        customError: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: 'red', backgroundColor: 'black' }} // 👈 Arka plan
                text1Style={{ color: 'white' }} // Yazı rengi
                text2Style={{ color: 'white' }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            />
        ),
    };
    const pressButton = () => {

        if (connected) sendLove();
        else connectLove();
    }
    const sendLove = () => {

    }
    const connectLove = () => {
        setConnectUserModal(true);
    }
    async function onConnectLove(codeInput) {
        setConnectUserModal(false);
        setLoading(true);
        let newCodeInput = processCodeInput(codeInput);
        console.log('Girilen kod:', codeInput);
        const connectedCheck = await ConnectToUserDB(newCodeInput, userTokenID, myUid);
        if (connectedCheck) {
            Toast.show({
                type: 'success',
                text1: 'CONNECTED TO USER!',
                visibilityTime: 2000,
                position: 'bottom',
            });
            setConnected(true);
            const connectedUserName = await getUserNameByID4(userTokenID, codeInput);
            setYourLoveName(connectedUserName);
        }

        setLoading(false);
    }
    const processCodeInput = (codeInput) => {

        let processed = codeInput.startsWith('#') ? codeInput.slice(1) : codeInput;


        if (processed.length !== 4) {
            Toast.show({
                type: 'customError',
                text1: 'Invalid Code!',
                visibilityTime: 2000,
                position: 'bottom',
            });
            return 'none';
        }

        return processed;
    };
    const setNameButton = async () => {
        if (nameInput === '') return;

        setNameInputModal(false);
        setLoading(true);
        await onAuthStateChanged(auth, (user) => {

            if (!user) {
                // If no user is logged in, sign in anonymously
                signInAnonymously(auth)
                    .then((userCredential) => {
                        console.log('Anonim giriş başarılı (Anonymous sign-in successful):', userCredential.user.uid);
                        setMyUid(userCredential.user.uid);
                        userCredential.user.getIdToken().then((idToken) => {
                            setUserTokenID(idToken);
                            saveUsertoDatabase(idToken, nameInput, userCredential.user.uid).then(() => {
                                getUser(idToken, userCredential.user.uid).then(id => {

                                    setId4(id);
                                    console.log(id);
                                }).catch(error => {
                                    console.error('Hata:', error);
                                });
                            });


                        });
                    })
                    .catch((error) => {
                        console.error('Anonim giriş hatası (Anonymous sign-in error):', error);
                    });
            }

        });
        setLoading(false);

    }
    return (

        <View style={styles.container}>

            <ConnectToUser visible={connectUserModal} onSubmit={(codeInput) => {

                onConnectLove(codeInput);
            }} />
            <Loading visible={loading} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={nameInputModal}
                onRequestClose={() => {

                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Enter Your Name:</Text>
                        <TextInput style={styles.textInput}
                            value={nameInput}
                            onChangeText={setNameInput} />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={setNameButton}>
                            <Text style={styles.textStyle}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Image
                source={require('../assets/background.png')}
                style={styles.background}
                resizeMode="contain"
            />
            <View style={styles.logoText}>
                <Image source={require('../assets/sendLoveText.png')} />
            </View>

            <View style={styles.content}>
                <View style={styles.userIdContainer}>
                    <Text style={styles.userIdText}>{id4 ? `#${id4}` : '#0000'}</Text>
                </View>
                <Text style={styles.yourLoveName}>{yourLoveName}</Text>
                <Text style={styles.incomingLove}>{recievedLove}</Text>
                <Text style={styles.textSmall}>sent loves today</Text>
            </View>
            <TouchableOpacity style={styles.sendLoveButton} onPress={pressButton}>
                <Text style={styles.sendLoveButtonText}>{connected ? 'SEND' : 'CONNECT'}</Text>
            </TouchableOpacity>

            <Toast config={toastConfig} />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    background: {
        position: 'absolute',
        width: '100%',
        alignSelf: 'center',
        marginTop: 150,

    },
    content: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
    },
    yourLoveName: {
        color: '#595959',
        fontSize: 22,
        fontWeight: 'light',
        fontFamily: 'notoserif',
    },
    incomingLove: {
        color: "#595959",
        fontSize: 80,
        lineHeight: 80,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        marginTop: 20,
    },
    textSmall: {
        color: '#595959',
        fontSize: 14,
        fontWeight: 'light',
        fontFamily: 'notoserif',
    },
    logoText: {
        alignSelf: 'center',
        marginTop: 10,
    },
    sendLoveButton: {
        borderRadius: 30,
        borderWidth: 3,
        borderColor: "#fb2235",
        width: '40%',
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    sendLoveButtonText: {
        color: "#fb2235",
        fontWeight: 'regular',
        fontFamily: 'Roboto',
        fontSize: 20,
    },
    userIdContainer: {
        backgroundColor: "#fb2235",
        position: 'absolute',
        right: 0,
        top: -30,
        width: 80,
        height: 40,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userIdText: {
        color: "white",
        fontSize: 18,
        fontWeight: 'light',
        fontFamily: 'serif',
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
    buttonOpen: {
        backgroundColor: '#F194FF',
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
});
