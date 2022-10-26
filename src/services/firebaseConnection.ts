import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAg9XNn5tL0axRgM1Vu7o851lMy2j7zclE",
    authDomain: "board-86bff.firebaseapp.com",
    projectId: "board-86bff",
    storageBucket: "board-86bff.appspot.com",
    messagingSenderId: "118737272566",
    appId: "1:118737272566:web:c7924e716421cd8646b6d7",
    measurementId: "G-H068NQXMXL"
  };
  
  // Initialize Firebase
  if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig)
  }
  
  export default firebase