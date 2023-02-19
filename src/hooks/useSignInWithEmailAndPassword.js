import { useState, useCallback } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useSignInWithEmailAndPassword() {
  const navigate = useNavigate();
  const [signInLoading, setSignInLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const signIn = useCallback(async function ({ email, password }) {
    const emailIsValid = emailRegex.test(email.value);
    const passwordIsValid = password.value.length > 5;

    let errors = false;

    if (!emailIsValid) {
      errors = true;
      toast.error('Email does not have a valid form of abc@def.gh');
    }

    if (!passwordIsValid) {
      errors = true;
      toast.error('Password needs to be at least 6 characters long');
    }

    if (errors) return;

    setSignInLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      toast.success('User signed in successfully', { pauseOnHover: false, autoClose: 1000, });
      navigate('/')
    } catch (err) {
      console.log(err);
      toast.error('Email or password error.');
    } finally {
      setSignInLoading(false);
    }
  }, []);

  return { signInLoading, signIn }
}