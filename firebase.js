// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaBQjoXHyS8NX9wvbAxv6VKgsdTWsCedQ",
  authDomain: "lwazi-s-insta.firebaseapp.com",
  projectId: "lwazi-s-insta",
  storageBucket: "lwazi-s-insta.appspot.com",
  messagingSenderId: "376336229323",
  appId: "1:376336229323:web:b0b37a2c079df55f658c4e"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()

export {app, db, storage}