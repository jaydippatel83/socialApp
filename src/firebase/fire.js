
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDwNTWMrEdOUy5_570uGNtnFzZse5Vl_3o",
    authDomain: "social-network-app-a53f8.firebaseapp.com",
    databaseURL: "https://social-network-app-a53f8.firebaseio.com",
    projectId: "social-network-app-a53f8",
    storageBucket: "social-network-app-a53f8.appspot.com",
    messagingSenderId: "880519746222",
    appId: "1:880519746222:web:8a3cf95a1268ad0027d33f",
    measurementId: "G-X838KLRNWC"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({});
export default firebase;


