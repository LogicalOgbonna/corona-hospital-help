import firebase from "firebase";

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: "corona-hospital-help",
    storageBucket: "corona-hospital-help.appspot.com",
    messagingSenderId: "423434005418",
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};
// Initialize Firebase
firebase.initializeApp(config);

const db = firebase.firestore();
export {
    firebase, db
}