// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCU6b4dXOwCBFPKqCntLWGI4bC2Rc-Zdrs",
    authDomain: "recycle-416816.firebaseapp.com",
    projectId: "recycle-416816",
    storageBucket: "recycle-416816.appspot.com",
    messagingSenderId: "998831533984",
    appId: "1:998831533984:web:c17970a9efd998a32c3ec5",
    measurementId: "G-HWKPZ1CVJT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
