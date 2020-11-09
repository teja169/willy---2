import * as firebase from 'firebase' 
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyA5NEQvZCABiEUyY0CmDW3iw7Rp3xLD6vI",
    authDomain: "willy-app-a2e2e.firebaseapp.com",
    databaseURL: "https://willy-app-a2e2e.firebaseio.com",
    projectId: "willy-app-a2e2e",
    storageBucket: "willy-app-a2e2e.appspot.com",
    messagingSenderId: "409972762478",
    appId: "1:409972762478:web:26403a31fc63e073b9837f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()