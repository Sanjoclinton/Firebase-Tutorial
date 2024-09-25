import React, { useState } from "react";

import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { googleProvider } from "../config/firebase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.code);
      return error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      return error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      return error;
    }
  };

  return (
    <div className=" flex flex-col items-center *:p-3 gap-3 bg-slate-500 p-4">
      <input
        className="w-1/2 rounded-md "
        type="email"
        placeholder="Enter Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-1/2 rounded-md "
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="rounded-md bg-pink-400 text-white font-bold "
        onClick={signIn}
      >
        Sign In
      </button>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Auth;
