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
    const collectionRef = firestore.collection('users');
    
    const snapShot = await userRef.get();
    const collectionSnapshot = await collectionRef.get();
    console.log('collectionSnapshot', {collection: collectionSnapshot.docs.map(doc => doc.data())});

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
  export const addCollectionAndDocuments  = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);


    const batch = firestore.batch();
    objectsToAdd.forEach((obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    }))

    return await batch.commit()

  }

  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
      const {title, items} = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    })

    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection; 
      return accumulator;}, {})
  }


  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  // const provider = new firebase.auth.GoogleAuthProvider();
  // provider.setCustomParameters({prompt: 'select_account'});
  // export const signInWithGoogle = () => auth.signInWithPopup(provider);


  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}




  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);


  export default firebase;