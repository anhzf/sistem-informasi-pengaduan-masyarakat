import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCMIIrkdxvEoLSsrn_xR_HvF9KUeZRLgmE',
  authDomain: 'oprec-upt-tik.firebaseapp.com',
  projectId: 'oprec-upt-tik',
  storageBucket: 'oprec-upt-tik.appspot.com',
  messagingSenderId: '849510769500',
  appId: '1:849510769500:web:9e4a3e5132d996cb089799',
} as const;

firebase.initializeApp(firebaseConfig);

export default firebase;
