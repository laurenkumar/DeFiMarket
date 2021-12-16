import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5SvOQLOnOj1bPeoNii3dFBdXUGOevI6k",
  authDomain: "safemoon-marketplace.firebaseapp.com",
  projectId: "safemoon-marketplace",
  storageBucket: "safemoon-marketplace.appspot.com",
  messagingSenderId: "676933090961",
  appId: "1:676933090961:web:b2be224a0f6c29072f8930",
  measurementId: "G-3KXTBP65BL",
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
