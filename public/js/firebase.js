import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let firebaseConfig = {
    apiKey: "AIzaSyCvm4iiArQcMyOXYU4r5vStYkWnShARgNc",
    authDomain: "blogging-site-f4df3.firebaseapp.com",
    projectId: "blogging-site-f4df3",
    storageBucket: "blogging-site-f4df3.appspot.com",
    messagingSenderId: "606776501559",
    appId: "1:606776501559:web:097196365b1a771885a6b2",
    measurementId: "G-MSVV9TTQSY",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// firebase.initializeApp(firebaseConfig); 

// let db = firebase.firestore();