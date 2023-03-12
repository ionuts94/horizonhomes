import React, { useState, useEffect } from 'react';
import { useFetchListings } from 'hooks';
import { ListingItem, SquareSpinner } from 'components';

export function CategoryPage({ category = 'sale', pageTitle, noDataMessage }) {
  const { fetchLoading, listings } = useFetchListings({});
  const [categoryListings, setCategoryListings] = useState([]);

  useEffect(() => {
    if (categoryListings.length) return;

    const categoryList = [];
    for (let listing of listings) {
      if (listing.data.offer && category === 'offer') {
        categoryList.push(listing);
      } else if (listing.data.type === category) {
        categoryList.push(listing);
      }
    }

    setCategoryListings(categoryList);
  }, [listings])

  if (fetchLoading) {
    return <SquareSpinner />
  }

  return (
    <main className='max-w-6xl mx-auto px-3'>
      <h1 className='text-3xl text-center mt-6 font-bold'>{pageTitle || 'Offers'}</h1>

      {categoryListings.length === 0 &&
        <p className='text-[#bbb] mt-[80px] text-center'>
          {noDataMessage || 'There are no offers for now. Please come back later.'}
        </p>
      }

      <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6'>
        {categoryListings.map(listing => (
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
