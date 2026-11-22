import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

/** Save an FCM token only after the signed-in user explicitly enables notifications. */
export async function registerCurrentDevice(token: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('Sign in with Google before registering this device.');
  if (!token || token.length < 20 || token.length > 4096) throw new Error('Invalid FCM token.');

  const key = `braintech_device_id_${user.uid}`;
  let deviceId = localStorage.getItem(key);
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(key, deviceId);
  }
  await setDoc(doc(db, 'users', user.uid, 'devices', deviceId), {
    token,
    consent: true,
    updatedAt: serverTimestamp(),
  });
}
