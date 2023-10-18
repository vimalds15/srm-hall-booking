// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3wdu3D04GMD3srk-cTdrgeioGwOiDfgc",
  authDomain: "srm-hall.firebaseapp.com",
  projectId: "srm-hall",
  storageBucket: "srm-hall.appspot.com",
  messagingSenderId: "696301466645",
  appId: "1:696301466645:web:fef4bc9051d9f2704d8a1c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);