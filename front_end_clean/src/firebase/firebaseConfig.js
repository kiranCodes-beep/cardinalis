import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyBR6rBSyeoMiIL2aD8FxrSsNLCPvo-_vjU",
  authDomain: "e-commerce-67bb4.firebaseapp.com",
  projectId: "e-commerce-67bb4",
  storageBucket: "e-commerce-67bb4.appspot.com",
  messagingSenderId: "338447279914",
  appId: "1:338447279914:web:16158443da453ae9966633"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);