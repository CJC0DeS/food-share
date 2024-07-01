import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleImg from "../assets/images/google-logo.png";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";

export default function GoogleAuth() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleGoogleBtnClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google-sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.user),
      });
      const data = await res.json();
      dispatch(setUser(data));
      nav("/");
    } catch (error) {
      console.log("Unable to sign in using google", error);
    }
  };
  return (
    <div className="flex flex-col">
      <button
        onClick={handleGoogleBtnClick}
        className="flex items-center justify-center px-5 bg-sky-300 text-sky-800 p-3 rounded-3xl uppercase hover:opacity-75 disabled:opacity-50"
        type="button"
      >
        <img src={GoogleImg} alt="Google Logo" className="mr-4 w-6 h-6" />
        Login / Signup with Google
      </button>
    </div>
  );
}
