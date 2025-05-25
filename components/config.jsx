// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4CCrIQdpn6DQc2wZ_n1F1xZeh-aQu_ko",
  authDomain: "send-love-624f6.firebaseapp.com",
  projectId: "send-love-624f6",
  storageBucket: "send-love-624f6.firebasestorage.app",
  messagingSenderId: "655749714262",
  appId: "1:655749714262:web:5654c539db3c2efe87c6f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);