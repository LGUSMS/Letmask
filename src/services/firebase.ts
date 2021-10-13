import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAE9XOqIrkO3Y9zuY7lAaRuQMzWHsvwXp8",
    authDomain: "letmask-4edf0.firebaseapp.com",
    databaseURL: "https://letmask-4edf0-default-rtdb.firebaseio.com",
    projectId: "letmask-4edf0",
    storageBucket: "letmask-4edf0.appspot.com",
    messagingSenderId: "113600113765",
    appId: "1:113600113765:web:597d5d4223c21eab71ea8c",
    measurementId: "G-QX10M5QE1K"
  };
  firebase.initializeApp(firebaseConfig);
 const auth = firebase.auth();
const database = firebase.database();

export {firebase,auth,database}