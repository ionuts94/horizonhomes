
import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from 'firebaseConfig';

export function useGoogleSignUp() {
  const navigate = useNavigate();
  const [gooleAuthLoading, setGoogleAuthLoading] = useState(false);

  async function googleSignUp() {
    setGoogleAuthLoading(true);
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const userDocRef = doc(db, 'users', result.user.uid);
      const docSnap = await getDoc(userDocRef);
      console.log(docSnap);

      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          name: result.user.displayName,
          email: result.user.email,
          created: serverTimestamp()
        })
      }
      toast.success('User signed in successfully', { pauseOnHover: false, autoClose: 1000, });
      navigate('/');
    } catch (err) {
      toast.error('Could not authenticate with Google.');
    } finally {
      setGoogleAuthLoading(false);
    }
  }

  return { gooleAuthLoading, googleSignUp }
}