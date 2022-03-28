import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADfnTRavzUK6zw5PBNPix7qSC0sjxbN2k",
  authDomain: "mobile-a0e2f.firebaseapp.com",
  projectId: "mobile-a0e2f",
  storageBucket: "mobile-a0e2f.appspot.com",
  messagingSenderId: "920010608022",
  appId: "1:920010608022:web:60f3ffb317ed278f9ae1b7",
  measurementId: "G-C8QMZP37WM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
