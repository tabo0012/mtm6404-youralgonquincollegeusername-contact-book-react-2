import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGUA9H1HNHjAwRX4fwjldlCTGh172uyZQ",
  authDomain: "contact-3fb35.firebaseapp.com",
  projectId: "contact-3fb35",
  storageBucket: "contact-3fb35.firebasestorage.app",
  messagingSenderId: "194472270685",
  appId: "1:194472270685:web:76a0d9b9ecd62978d3a6b4",
  measurementId: "G-T6F552MC3Y",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
