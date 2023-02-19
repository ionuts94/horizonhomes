import { useState } from 'react';
import { auth, db } from "firebaseConfig.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function useSignUp() {
  const navigate = useNavigate();
  const [signUpLoading, setSignUpLoading] = useState(false);

  const nameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  async function signUp({ name, email, password }) {
    const nameIsValid = nameRegex.test(name.value);
    const emailIsValid = emailRegex.test(email.value);
    const passwordIsValid = password.value.length > 5;

    let errors = false;

    if (!nameIsValid) {
      errors = true;
      toast.error('Please insert full name. Name should contain two words');
    }

    if (!emailIsValid) {
      errors = true;
      toast.error('Email does not have a valid form of abc@def.gh');
    }

    if (!passwordIsValid) {
      errors = true;
      toast.error('Password needs to be at least 6 characters long');
    }

    if (errors) return;

    setSignUpLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(
        auth, email.value, password.value
      );
      await updateProfile(auth.currentUser, {
        displayName: name.value
      });
      await setDoc(doc(db, 'users', user.user.uid), {
        name: name.value,
        email: email.value,
        created: serverTimestamp()
      });
      toast.success('Account registered successfully',
        { pauseOnHover: false, autoClose: 1000 }
      );
      navigate('/')
    } catch (err) {
      if (err) {
        toast.error(err.message);
      }
    } finally {
      setSignUpLoading(false);
    }
  }

  return { signUp, signUpLoading }
}