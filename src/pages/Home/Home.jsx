import React, { useEffect } from 'react';
import { useFetchListings } from 'hooks';
import { Slider } from 'components';
import { SquareSpinner } from 'components';

export function Home() {
  const { listings, fetchLoading } = useFetchListings({ fetchAll: true });

  if (fetchLoading) {
    return <SquareSpinner />
  }

  if (!listings.length) {
    return <></>
  }

  console.log(listings);

  return (
    <Slider
      listings={listings}
    />
  )
}