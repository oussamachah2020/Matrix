import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV4zT3agaKoiGQK-Ek_tZQEQIE6Ujhz9o",
  authDomain: "matrix-c19ac.firebaseapp.com",
  projectId: "matrix-c19ac",
  storageBucket: "matrix-c19ac.appspot.com",
  messagingSenderId: "239611767262",
  appId: "1:239611767262:web:63ab524f37bd7ada49554f",
  measurementId: "G-JWHM8XYQD5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
  
export { auth };
