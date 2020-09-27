import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBG7PxurNlMuEEI3L5YiCjFv2wTVwFVWK4',
  authDomain: 'crowstorm-a3269.firebaseapp.com',
  databaseURL: 'https://crowstorm-a3269.firebaseio.com',
  projectId: 'crowstorm-a3269',
  storageBucket: 'crowstorm-a3269.appspot.com',
  messagingSenderId: '1068169844642',
  appId: '1:1068169844642:web:1aeaa749a9201a076544fb',
  measurementId: 'G-J0QXLW17H8'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };
