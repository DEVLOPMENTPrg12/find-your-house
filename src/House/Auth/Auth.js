import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import "./Auth.css";
import Nav from "../navigation/Nav";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const signUpNameRef = useRef("");
  const signUpEmailRef = useRef("");
  const signUpPasswordRef = useRef("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSignInSubmit = async () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
      toast.error("❌ All fields are required!");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("❌ Invalid email address!");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("❌ Password must be at least 6 characters!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href='/'
      toast.success("✅ Login successful!");
      emailRef.current.value = "";
      passwordRef.current.value = "";
    } catch (error) {
      toast.error("❌ Login error: " + error.message);
    }
  };

  const handleSignUpSubmit = async () => {
    const name = signUpNameRef.current.value.trim();
    const email = signUpEmailRef.current.value.trim();
    const password = signUpPasswordRef.current.value.trim();

    if (!name || !email || !password) {
      toast.error("❌ All fields are required!");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("❌ Invalid email address!");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("❌ Password must be at least 6 characters!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: name,
      });
      toast.success("✅ Account created successfully!");
      signUpNameRef.current.value = "";
      signUpEmailRef.current.value = "";
      signUpPasswordRef.current.value = "";
    } catch (error) {
      toast.error("❌ Sign-up error: " + error.message);
    }
  };

  const togglePanel = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
    <div>
      <Nav/>
    <div className="body">
      <ToastContainer />
      
      <div className={`container ${!isSignIn ? "right-panel-active" : ""}`}>
        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Sign In</h1>
            <div className="input-group">
              <input type="email" ref={emailRef} placeholder="Email" />
            </div>
            <div className="input-group">
              <input type="password" ref={passwordRef} placeholder="Password" />
            </div>
            <a href="#">Forgot your password?</a>
            <button className="buttonAuth" onClick={handleSignInSubmit}>
              Sign In
            </button>
          </form>
        </div>
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Create Account</h1>
            <div className="input-group">
              <input type="text" ref={signUpNameRef} placeholder="Name" />
            </div>
            <div className="input-group">
              <input type="email" ref={signUpEmailRef} placeholder="Email" />
            </div>
            <div className="input-group">
              <input type="password" ref={signUpPasswordRef} placeholder="Password" />
            </div>
            <button className="buttonAuth" onClick={handleSignUpSubmit}>
              Sign Up
            </button>
          </form>
        </div>
        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected, please sign in with your personal info</p>
              <button className="buttonAuth ghost" onClick={togglePanel}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="buttonAuth ghost" onClick={togglePanel}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Auth;
