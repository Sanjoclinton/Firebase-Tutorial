import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoMlwmZYReoaXr-6bhjZd6THJFw78U_Ic",
  authDomain: "fir-tut-a6868.firebaseapp.com",
  projectId: "fir-tut-a6868",
  storageBucket: "fir-tut-a6868.appspot.com",
  messagingSenderId: "130198691763",
  appId: "1:130198691763:web:eeae1b1c9bbce2157535c6",
  measurementId: "G-W9BCCX6M1D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth app
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore
const db = getFirestore(app);

const moviesCollectionRef = collection(db, "movies");

// Get data
export const getMoviesList = async () => {
  try {
    const querySnapShot = await getDocs(moviesCollectionRef);
    const movieList = querySnapShot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return movieList;
  } catch (error) {
    return error;
  }
};

// Add data
export const addMovie = async (formData) => {
  try {
    await addDoc(moviesCollectionRef, {
      title: formData.title,
      releaseDate: formData.releaseDate,
      receivedAnOscar: formData.receivedAnOscar,
    });
  } catch (error) {
    console.log(error);
  }
};


export const deleteMovie = async (id) => {
  try {
    const movieDoc = doc(db, "movies", id);
    return await deleteDoc(movieDoc);
  } catch (error) {
    return error;
  }
}
