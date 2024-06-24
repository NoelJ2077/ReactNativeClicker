# Cookie Clicker with Firebase authentication written in React Native. 
# Requirements: npm, expo go app for IOS or Android Emulator!

# Run with: npx create-expo-app -name_your_app

# You need to add your own "firebaseConfig.js" file in the components folder. It should look like this: 
// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "yourkey",
  authDomain: "yourapp.firebaseapp.com",
  projectId: "id",
  storageBucket: "idbucket.appspot.com",
  messagingSenderId: "idmsg",
  appId: "yourappid",
  measurementId: "xyz"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase app started: ', app.name);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
console.log('Firebase Auth started: ', auth.name);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);
console.log('Firebase Firestore started: ', db.name);