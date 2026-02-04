// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBl4ZKy3OxoNDh2vvpXk-mcvTDWJ6dSSbA",
  authDomain: "sctissuereportingsystem.firebaseapp.com",
  projectId: "sctissuereportingsystem",
  storageBucket: "sctissuereportingsystem.firebasestorage.app",
  messagingSenderId: "906707884232",
  appId: "1:906707884232:web:1bd16ef759f557e2772dfd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
