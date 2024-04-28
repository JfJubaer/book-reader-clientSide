// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDOVqtiaIUOhKcoTAxTCrzgggKLHSK243g',
  authDomain: 'tech-47a16.firebaseapp.com',
  projectId: 'tech-47a16',
  storageBucket: 'tech-47a16.appspot.com',
  messagingSenderId: '571399327768',
  appId: '1:571399327768:web:39d449642ccf6f9577f36d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
