import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthState, useFetchListing } from 'hooks';
import { SquareSpinner } from 'components';
import { useParams } from 'react-router-dom';

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

export function OwnerRoute() {
  const { listingId } = useParams();
  const { loggedIn, loadingAuth, user } = useAuthState();
  const { data, fetchLoading } = useFetchListing(listingId);

  if (loadingAuth || fetchLoading || fetchLoading === undefined) {
    return <SquareSpinner />
  }

  if (loggedIn && listingId && user.uid === data.owner) {
    return <Outlet context={{ data, fetchLoading }} />
  }

  return <Navigate to='/' />
}