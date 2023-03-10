import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
const provider = new GoogleAuthProvider();

const database = firebaseApp.database()

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // console.log(result);
      const name = result.user?.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name)
      localStorage.setItem("email", email)
      localStorage.setItem("profilePic", profilePic)

      location.assign(`/Home?username=${name}`)
    })
    .catch((err) => console.log(err));
};

export { auth, db, storage, database,signInWithGoogle };
