import axios from "axios";
import config from "./Config";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const DatasourceInstance = axios.create({
    baseURL: config.baseUrl,
    timeout: 2000,
});

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwOFixwcdJK225S_EE9JzimOq2aqCTeP8",
    authDomain: "phimgaygo.firebaseapp.com",
    projectId: "phimgaygo",
    storageBucket: "phimgaygo.appspot.com",
    messagingSenderId: "293234268314",
    appId: "1:293234268314:web:864f694cc20daf99a3a723",
    measurementId: "G-EZ1D641QEM",
};

// Initialize Firebase
const FireBaseApp = initializeApp(firebaseConfig);
const FireStore = getFirestore(FireBaseApp);
const FireStorage = getStorage(FireBaseApp);
const FireAuth = getAuth(FireBaseApp);
//console.log(FireBaseApp)
//const analytics = getAnalytics(FireBaseApp);

if (import.meta.env.DEV) {
    connectFirestoreEmulator(FireStore, "localhost", 8080);
    connectStorageEmulator(FireStorage, "localhost", 9199);
    connectAuthEmulator(FireAuth, "http://localhost:9099");
}

export {
    FireBaseApp,
    FireStore,
    FireStorage,
    FireAuth
};

export default DatasourceInstance;
