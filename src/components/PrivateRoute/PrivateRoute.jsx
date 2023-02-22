import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState } from 'hooks';
import { SquareSpinner } from 'components';

export function PrivateRoute() {
  const { loggedIn, loadingAuth } = useAuthState();

  if (loadingAuth) {
    return <SquareSpinner />
  }

  if (loggedIn) {
    return <Outlet />
  }

  return <Navigate to='/sign-in' />
}
