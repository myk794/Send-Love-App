import { database } from "../firebase/firebase";
import { FIREBASE_DATABASE_URL } from '@env';
import axios from 'axios';
import { getIdToken } from "firebase/auth";
import { useState } from "react";
const dbUrl = FIREBASE_DATABASE_URL + '/users.json?auth=';
function generateCode(length = 4) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    return code;
}
async function getUser(userTokenID, uid) {
    const url = dbUrl + userTokenID;
    try {
        const response = await axios.get(url);
        console.log('Veri:', response.data);
        let foundId = null;
        Object.entries(response.data).forEach(([key, user]) => {
            if (user.uid === uid) {
                foundId = user.id;
            }
        });

        console.log('Bulunan ID:', foundId);
        return foundId;
    } catch (error) {
        console.error('Hata:', error);
    }

}
async function ConnectToUserDB(codeInput, userTokenID, myUid) {
    const url = dbUrl + userTokenID;
    try {
        const response = await axios.get(url);
        data = response.data;
        const ids = Object.values(data)
            .filter(item => item.id)
            .map(item => item.id);

        console.log(ids);
        const foundId = ids.find(id => id === codeInput);

        if (foundId) {
            let targetKey = null;
            Object.entries(data).forEach(([key, user]) => {
                if (user.uid === myUid) {
                    targetKey = key;
                }
            });
            if (!targetKey) {
                console.log('UID bulunamadı.');
                return;
            }  
            const updateURL = FIREBASE_DATABASE_URL + `/users/${targetKey}.json?auth=${userTokenID}`;
            const updateField = {connectedID: codeInput};
            await axios.patch(updateURL,updateField);
            console.log('connectedID başarıyla güncellendi!');
            return true;
        } else {
            console.log('Eşleşen ID bulunamadı.');
        }

    } catch (error) {
        console.error('Hata:', error);
    }
}
async function saveUsertoDatabase(userID, name, uid) {
    const url = dbUrl + userID;
    let userDbID = generateCode();
    //Get Ids
    const response = await axios.get(url);
    data = response.data;
    const ids = Object.values(data)
        .filter(item => item.id)
        .map(item => item.id);

    console.log(ids);
    while (ids.includes(userDbID)) {
        userDbID = generateCode();
    }


    console.log(userDbID);

    await axios.post(url, {
        id: userDbID,
        name: name,
        recieved: 0,
        sent: 0,
        uid: uid,
    })
        .then(response => {
            console.log('Veri başarıyla eklendi:', response.data);
        })
        .catch(error => {
            console.error('Hata oluştu:', error.response?.status, error.message);
        });
}
export { saveUsertoDatabase, getUser,ConnectToUserDB }