// import firebase, { firestore } from 'firebase';

// require("firebase/firestore");

import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'

// Initialize firebase
const config = {
    apiKey: "AIzaSyBW6o4bavpxMSBJeDr6d1Dzz0pcH9iJbQA",
    authDomain: "vue-shop-fb2e6.firebaseapp.com",
    databaseURL: "https://vue-shop-fb2e6.firebaseio.com",
    projectId: "vue-shop-fb2e6",
    storageBucket: "vue-shop-fb2e6.appspot.com",
    messagingSenderId: "965646084431",
    appId: "1:965646084431:web:5e4d40ce5d02c495"
};

const fb = firebase.initializeApp(config);

const db = firebase.firestore();

export {fb, db}