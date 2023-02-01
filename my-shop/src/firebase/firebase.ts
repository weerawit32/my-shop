import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoCqQuF2EZLTNj5S2quwvrpcmI1EY9-1Y",
  authDomain: "my-shop-17b19.firebaseapp.com",
  projectId: "my-shop-17b19",
  storageBucket: "my-shop-17b19.appspot.com",
  messagingSenderId: "485564710422",
  appId: "1:485564710422:web:5afaedee8fe3ecacebff37",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
