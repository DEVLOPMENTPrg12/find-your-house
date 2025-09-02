// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbwnN3UWFW5BUdEtfjawmHsK-BQmBHvjY",
    authDomain: "homyz-c6200.firebaseapp.com",
    projectId: "homyz-c6200",
    storageBucket: "homyz-c6200.appspot.com",
    messagingSenderId: "944959837091",
    appId: "1:944959837091:web:dbfd3fc8e726cb69a70016",
    measurementId: "G-TKTMNN4JVE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app)
export default app;