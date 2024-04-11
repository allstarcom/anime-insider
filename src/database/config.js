import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNowlDSLcXB4xkXfOytco3zM5vXY9g2xE",
  authDomain: "react-native-ec666.firebaseapp.com",
  projectId: "react-native-ec666",
  storageBucket: "react-native-ec666.appspot.com",
  messagingSenderId: "851884238962",
  appId: "1:851884238962:web:730b8a478c186520313aeb"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { db }



