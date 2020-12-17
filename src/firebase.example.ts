import firebase from 'firebase';

const firebaseConfig = {
  // config here...
} as const;

firebase.initializeApp(firebaseConfig);

export default firebase;
