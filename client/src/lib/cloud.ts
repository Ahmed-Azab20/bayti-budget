import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, collection, onSnapshot, query, setDoc, doc, getDocs, writeBatch, type Firestore } from "firebase/firestore";

export type FirebaseSettings = { apiKey: string; authDomain: string; projectId: string; storageBucket?: string; messagingSenderId?: string; appId: string; };
let app: FirebaseApp | null = null; let firestore: Firestore | null = null; let auth: Auth | null = null;
export function parseFirebaseConfig(raw: string): FirebaseSettings | null { try { const parsed = JSON.parse(raw) as FirebaseSettings; if (!parsed.apiKey || !parsed.authDomain || !parsed.projectId || !parsed.appId) return null; return parsed; } catch { return null; } }
export function configureFirebase(config: FirebaseSettings) { app = getApps()[0] || initializeApp(config); firestore = getFirestore(app); auth = getAuth(app); return firestore; }
export function getFirebaseAuth() { if (!auth) throw new Error("Firebase غير مهيأ"); return auth; }
export function isFirebaseReady() { return Boolean(firestore); }
export function watchCloudCollection<T extends { id: number }>(householdId: string, name: string, onData: (items: T[]) => void, onError: (error: Error) => void) { if (!firestore) throw new Error("Firebase غير مهيأ"); return onSnapshot(query(collection(firestore, "households", householdId, name)), (snapshot) => onData(snapshot.docs.map((item) => item.data() as T)), onError); }
export async function pushCloudCollection<T extends { id: number }>(householdId: string, name: string, items: T[]) { if (!firestore) throw new Error("Firebase غير مهيأ"); const ref = collection(firestore, "households", householdId, name); const existing = await getDocs(ref); const batch = writeBatch(firestore); existing.docs.forEach((item) => batch.delete(item.ref)); items.forEach((item) => batch.set(doc(ref, String(item.id)), item)); await batch.commit(); }
