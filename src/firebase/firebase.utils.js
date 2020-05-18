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

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    // console.log('createUserProfileDocument');
    // console.log('userAuth', userAuth)
    if (!userAuth) {
      return;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    console.log(snapShot);

    if (!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData,
        })
      } catch (error) {
          console.log('error creating user', error.message);
      }
    }

    return userRef;
  }


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;