// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDOvASt7c7bHkN2WNnf3nXrNOqKbSxiAKA",
  authDomain: "advent-calender-43953.firebaseapp.com",
  projectId: "advent-calender-43953",
  storageBucket: "advent-calender-43953.firebasestorage.app",
  messagingSenderId: "301331839216",
  appId: "1:301331839216:web:ea8502d600b93c62c42a35",
  databaseURL:
    "https://advent-calender-43953-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
