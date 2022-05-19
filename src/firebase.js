// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOVmig44Y7qWtRrvrRs_QWNv1kMvqKz5k",
  authDomain: "kalyeo.firebaseapp.com",
  projectId: "kalyeo",
  storageBucket: "kalyeo.appspot.com",
  messagingSenderId: "625485172697",
  appId: "1:625485172697:web:e9bfee8ba5b451f36453c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;