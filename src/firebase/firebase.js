import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCooxCIr1HSDi6y1wLCi6Xitibwn-hob8s",
    authDomain: "mshproject09.firebaseapp.com",
    databaseURL: "https://mshproject09.firebaseio.com",
    projectId: "mshproject09",
    storageBucket: "mshproject09.appspot.com",
    messagingSenderId: "220761370678"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth;
const db = firebase.database();
const storage = firebase.storage();

export {
  auth,
  db,
  storage,
};