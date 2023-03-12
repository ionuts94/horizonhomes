import React, { useState, useEffect } from 'react';
import { useFetchListings } from 'hooks';
import { ListingItem, SquareSpinner } from 'components';

export function Offers() {
  const { fetchLoading, listings } = useFetchListings({});
  const [offerListings, setOfferListings] = useState([]);

  useEffect(() => {
    if (offerListings.length) return;

    const offers = [];
    for (let listing of listings) {
      if (listing.data.offer) {
        offers.push(listing)
      }
    }
  }, [listings])

  if (fetchLoading) {
    return <SquareSpinner />
  }

  return (
    <main className='max-w-6xl mx-auto px-3'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Offers</h1>

      {offerListings.length === 0 &&
        <p className='text-[#bbb] mt-[80px] text-center'>
          There are no offers for now. Please come back later.
        </p>
      }

      <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {offerListings.map(listing => (
          <ListingItem
            key={listing.id}
            id={listing.id}
            listing={listing.data}
          />
        ))}
      </ul>
    </main>
  )
}
