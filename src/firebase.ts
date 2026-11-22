
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBH0QDpKfYrUh0HgbxI47ljx9RjHyzg41I",
  authDomain: "braintech-28de1.firebaseapp.com",
  projectId: "braintech-28de1",
  storageBucket: "braintech-28de1.firebasestorage.app",
  messagingSenderId: "948478400084",
  appId: "1:948478400084:web:a7274f7c4c38264a87bfc1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function getFirebaseMessaging() {
  if (!(await isSupported())) return null;
  return getMessaging(app);
}
