import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from 'hooks';

export function PrivateRoute() {
  const { loggedIn, loadingAuth } = useAuthState();

  if (loadingAuth) {
    return <p>Loading...</p>
  }

  if (loggedIn) {
    return <Outlet />
  }

  return <Navigate to='/sign-in' />
}
