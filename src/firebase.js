import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDlP3I2bV5BOFusH1x0GteeuaSncNprz3o",
  authDomain: "blog-cf757.firebaseapp.com",
  projectId: "blog-cf757",
  storageBucket: "blog-cf757.appspot.com",
  messagingSenderId: "322223375897",
  appId: "1:322223375897:web:1730d86cd87377425dcc88"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)