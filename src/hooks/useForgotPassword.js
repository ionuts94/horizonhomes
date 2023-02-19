import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'firebaseConfig';
import { toast } from 'react-toastify';

export function useForgotPassword() {
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  async function forgotPassword({ email }) {
    const emailIsValid = emailRegex.test(email.value);

    if (!emailIsValid) {
      toast.error('Email does not have a valid form of abc@def.gh');
      return;
    }

    setForgotPasswordLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.value);
      toast.success('Password reset email sent successfully');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        toast.error('This email does not exist in our database. Please sign up.');
        return;
      }
      toast.error(err.message);
    } finally {
      setForgotPasswordLoading(false);
    }
  }

  return { forgotPassword, forgotPasswordLoading }
}