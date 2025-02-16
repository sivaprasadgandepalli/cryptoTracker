// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_-RrH4EQUf6yuF_d8bZKnk_Tz2m_hL6o",
  authDomain: "cryptotracker-172e5.firebaseapp.com",
  projectId: "cryptotracker-172e5",
  storageBucket: "cryptotracker-172e5.firebasestorage.app",
  messagingSenderId: "316360470104",
  appId: "1:316360470104:web:eae9f46ad7f726f870242d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);