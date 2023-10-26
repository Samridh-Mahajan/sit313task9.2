import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './SignOut.css';

const SignOut = () => {
  const navigate = useNavigate();
  const [isSignedOut, setIsSignedOut] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthState = async () => {

      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        setUser(currentUser);
      } else {
        setIsSignedOut(true);
      }
    }

    checkAuthState();
  }, []);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="container">
      {user ? (
        <div>
          <h1>Congratulations, {user.displayName}!</h1>
          <p>You are signed in.</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : isSignedOut ? (
        <p>You are already signed out.</p>
      ) : (
        <p>Signing out...</p>
      )}
    </div>
  );
};

export default SignOut;
