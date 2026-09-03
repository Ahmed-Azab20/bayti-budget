import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, collection, onSnapshot, query, doc, getDocs, writeBatch, type Firestore } from "firebase/firestore";

/** إعدادات Firebase العامة لتطبيق بيتي. مفاتيح Firebase Web ليست أسراراً، لكن حماية البيانات تعتمد على Firestore Rules. */
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBY0WG5yVhP9TZn3ndT2iq0a938hknim24",
  authDomain: "bayti-budget-cc178.firebaseapp.com",
  projectId: "bayti-budget-cc178",
  storageBucket: "bayti-budget-cc178.firebasestorage.app",
  messagingSenderId: "807665847944",
  appId: "1:807665847944:web:1e5ff1670dbfe8f9e9d93d",
  measurementId: "G-R78TGPMED0",
} as const;

export const FAMILY_ID = "azab-family";
export type FirebaseSettings = typeof FIREBASE_CONFIG;
let app: FirebaseApp | null = null;
let firestore: Firestore | null = null;
let auth: Auth | null = null;

export function configureFirebase(config: FirebaseSettings = FIREBASE_CONFIG) {
  app = getApps()[0] || initializeApp(config);
  firestore = getFirestore(app);
  auth = getAuth(app);
  return firestore;
}
export function getFirebaseAuth() { if (!auth) configureFirebase(); return auth!; }
export function watchCloudCollection<T extends { id: number }>(householdId: string, name: string, onData: (items: T[]) => void, onError: (error: Error) => void) { if (!firestore) configureFirebase(); return onSnapshot(query(collection(firestore!, "households", householdId, name)), (snapshot) => onData(snapshot.docs.map((item) => item.data() as T)), onError); }
export async function pushCloudCollection<T extends { id: number }>(householdId: string, name: string, items: T[]) { if (!firestore) configureFirebase(); const ref = collection(firestore!, "households", householdId, name); const existing = await getDocs(ref); const batch = writeBatch(firestore!); existing.docs.forEach((item) => batch.delete(item.ref)); items.forEach((item) => batch.set(doc(ref, String(item.id)), item)); await batch.commit(); }
