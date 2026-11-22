import { doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

export type Pairing = {
  ownerUid: string;
  caregiverUid: string;
  status: 'pending' | 'accepted';
  createdAt: Timestamp;
  expiresAt: Timestamp;
};

function currentUid(): string {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Sign in with Google first.');
  return uid;
}

export async function createPairing(caregiverUid: string): Promise<string> {
  const ownerUid = currentUid();
  const target = caregiverUid.trim();
  if (!/^[A-Za-z0-9]{20,128}$/.test(target)) throw new Error('Enter the caregiver Firebase UID.');
  if (target === ownerUid) throw new Error('Use a different Google account for the caregiver.');
  const invitationId = crypto.randomUUID();
  const now = Date.now();
  await setDoc(doc(db, 'pairings', invitationId), {
    ownerUid,
    caregiverUid: target,
    status: 'pending',
    createdAt: Timestamp.fromMillis(now),
    expiresAt: Timestamp.fromMillis(now + 24 * 60 * 60 * 1000),
  });
  return invitationId;
}

export async function acceptPairing(invitationId: string): Promise<Pairing> {
  const uid = currentUid();
  const id = invitationId.trim();
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error('Enter a valid invitation ID.');
  const ref = doc(db, 'pairings', id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) throw new Error('Invitation not found or not accessible to this account.');
  const pairing = snapshot.data() as Pairing;
  if (pairing.caregiverUid !== uid) throw new Error('This invitation is for a different Google account.');
  if (pairing.status !== 'pending') throw new Error('This invitation was already accepted.');
  if (pairing.expiresAt.toMillis() <= Date.now()) throw new Error('This invitation has expired.');
  await updateDoc(ref, { status: 'accepted' });
  return { ...pairing, status: 'accepted' };
}

export async function checkPairing(invitationId: string): Promise<Pairing> {
  const id = invitationId.trim();
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error('Enter a valid invitation ID.');
  const snapshot = await getDoc(doc(db, 'pairings', id));
  if (!snapshot.exists()) throw new Error('Invitation not found or not accessible.');
  return snapshot.data() as Pairing;
}
