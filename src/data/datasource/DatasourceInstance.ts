import axios from 'axios'
import config from './config'

const DatasourceInstance = axios.create({
    baseURL: config.baseUrl,
    timeout: 2000,
})

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwOFixwcdJK225S_EE9JzimOq2aqCTeP8",
    authDomain: "phimgaygo.firebaseapp.com",
    projectId: "phimgaygo",
    storageBucket: "phimgaygo.appspot.com",
    messagingSenderId: "293234268314",
    appId: "1:293234268314:web:864f694cc20daf99a3a723",
    measurementId: "G-EZ1D641QEM"
};

// Initialize Firebase
const FireBaseApp = initializeApp(firebaseConfig);
console.log(FireBaseApp)
//const analytics = getAnalytics(FireBaseApp);

export { FireBaseApp };

export default DatasourceInstance