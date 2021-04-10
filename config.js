import firebase from 'firebase';
require("@firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD12BXsvn9R2QYbvrAJ10zdQi-Kq2ucriM",
  authDomain: "landfills-d956e.firebaseapp.com",
  projectId: "landfills-d956e",
  storageBucket: "landfills-d956e.appspot.com",
  messagingSenderId: "925332100725",
  appId: "1:925332100725:web:aad8335d43c62da28bca3c",
  measurementId: "G-RGM1DDJ6ZL"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();