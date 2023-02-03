// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZhMMtOUmrXx6bDenY8COhCEbcGT1P4ck",
  authDomain: "findhouse-clone-react-js.firebaseapp.com",
  projectId: "findhouse-clone-react-js",
  storageBucket: "findhouse-clone-react-js.appspot.com",
  messagingSenderId: "676585349311",
  appId: "1:676585349311:web:ad190ec7271bd4ba22660a"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db=getFirestore();