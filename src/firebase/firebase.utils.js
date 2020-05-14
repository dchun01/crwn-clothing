import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyATp2LCYgHrFPhZqpSsWF7fdwqknp53MO4",
    authDomain: "crwn-db-bd0d8.firebaseapp.com",
    databaseURL: "https://crwn-db-bd0d8.firebaseio.com",
    projectId: "crwn-db-bd0d8",
    storageBucket: "crwn-db-bd0d8.appspot.com",
    messagingSenderId: "86659762908",
    appId: "1:86659762908:web:484bb43f6aee91f38b0219"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;