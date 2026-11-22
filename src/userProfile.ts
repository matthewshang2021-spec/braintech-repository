
import { User } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./firebase";

export async function createUserProfile(user: User) {
  const userRef = doc(db, "users", user.uid);
  const existingProfile = await getDoc(userRef);

  if (existingProfile.exists()) {
    return;
  }

  await setDoc(userRef, {
    displayName: user.displayName || "BrainTech User",
    email: user.email || "",
    createdAt: serverTimestamp()
  });
}
