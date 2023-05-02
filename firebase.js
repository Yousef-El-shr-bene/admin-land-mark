// npm install firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const colRef = collection(db, "data");
const q = query(colRef , orderBy("time","desc"))
//
async function signingInWithEmailAndPassword(emeilandpassword) {
  let username = "no";
  await signInWithEmailAndPassword(auth, ...emeilandpassword)
    .then((user) => {
      username = user;
      // console.log(user.user);
    })
    .catch((err) => {
      username = err;
      // console.log(err);
    });
  return username;
}

async function createUserWithEmailAndPasswordd(emeilandpassword) {
  let data = "no";
  await createUserWithEmailAndPassword(auth, ...emeilandpassword)
    .then((user) => {
      data = user;
      // console.log(user.user);
    })
    .catch((err) => {
      // console.log(err);
      data = err;
    });
  return data;
}

const addform = async (
  ApartmentData,
  Feedback,
  customerName,
  email,
  phoneNumber,
  sell,
  uid
) => {
  await addDoc(colRef, {
    ApartmentData: ApartmentData,
    Feedback: Feedback,
    customerName: customerName,
    email: email,
    phoneNumber: phoneNumber,
    sell: sell,
    time: new Date(),
    uid: uid,
  });
};

const gitdata = async () => {
  try {
    const data = await getDocs(q,colRef);
    return data.docs;
  } catch (err) {
    return err;
  }
};

const deleteform = (id) => {
  const docref = doc(db, "data", id);
  deleteDoc(docref);
};

export {
  signingInWithEmailAndPassword,
  createUserWithEmailAndPasswordd,
  addform,
  gitdata,
  deleteform
};
