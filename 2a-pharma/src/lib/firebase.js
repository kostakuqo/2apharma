import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyB-Td7FXKMf_cbfZvQEzShTZrik7gAxhKI",
    authDomain: "a-pharma-e04e6.firebaseapp.com",
    projectId: "a-pharma-e04e6",
    storageBucket: "a-pharma-e04e6.firebasestorage.app",
    messagingSenderId: "558544140253",
    appId: "1:558544140253:web:eb94bd261d6df625476834"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);