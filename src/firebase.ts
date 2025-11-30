// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
 apiKey: "AIzaSyBps0n_whlDmfMVLlivHBrdan7Z73ufVvo",
  authDomain: "website-84438.firebaseapp.com",
  projectId: "website-84438",
  storageBucket: "website-84438",
  messagingSenderId: "275122731412",
  appId: "1:275122731412:web:e611b01d2e5b5645637781",
  measurementId: "G-YJTXGQETFY"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);