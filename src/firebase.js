import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAhSamLAEk9V_tvF1tNfgYeVSyyw4euhFo",
    authDomain: "bt3103-e1798.firebaseapp.com",
    databaseURL: "https://bt3103-e1798.firebaseio.com",
    projectId: "bt3103-e1798",
    storageBucket: "bt3103-e1798.appspot.com",
    messagingSenderId: "921585955261",
    appId: "1:921585955261:web:51197ef1a69ce3f3b362d4",
    measurementId: "G-EPYGJ8TRWZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
  var database = firebase.firestore();
  export default database;
