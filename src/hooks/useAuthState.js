import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function useAuthState() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState();
  const auth = getAuth();

  useEffect(function authListener() {
    const unsubscribeAuthListener = onAuthStateChanged(auth, (loggedUser) => {
      if (loggedUser) {
        setUser(loggedUser);
        setLoggedIn(true);
      }
      setLoadingAuth(false);
    });

    return () => unsubscribeAuthListener();
  }, [auth])

  return { user, loggedIn, loadingAuth }
}
