// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyC_rFR8mf3U7LzDP9Q8eNjq83c2YXLi424",
//     authDomain: "betbuddies-3f7c6.firebaseapp.com",
//     projectId: "betbuddies-3f7c6",
//     storageBucket: "betbuddies-3f7c6.firebasestorage.app",
//     messagingSenderId: "241217604196",
//     appId: "1:241217604196:web:73c2985de6d9c0b4f92d71",
//     measurementId: "G-0NQD0VN2C2"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);