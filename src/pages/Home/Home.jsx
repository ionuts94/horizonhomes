import React, { useState, useEffect } from 'react';
import { useFetchListings } from 'hooks';
import { HomeSection, ListingItem, Slider } from 'components';
import { SquareSpinner } from 'components';
import { Link } from 'react-router-dom';

export function Home() {
  const { listings, fetchLoading } = useFetchListings({ fetchAll: true });
  const [listingsPerSection, setLisingPerSection] = useState({
    offers: [],
    forRent: [],
    forSale: []
  })

  useEffect(() => {
    // if (offerListings.length || !listings.length) return;

    const offers = [];
    const forRent = [];
    const forSale = [];

    for (let listing of listings) {
      if (listing.data.offer && offers.length < 4) {
        offers.push(listing);
      } else if (listing.data.type === 'rent' && forRent.length < 4) {
        forRent.push(listing);
      } else if (forSale.length < 4) {
        forSale.push(listing);
      }
    }

    setLisingPerSection({
      offers,
      forRent,
      forSale
    });
  }, [listings])

  if (fetchLoading) {
    return <SquareSpinner />
  }

  if (!listings.length) {
    return <></>
  }

  console.log(listings);

  return (
    <>
      <Slider
        listings={listings}
      />

      <div className='max-w-6xl mx-auto pt-4 space-y-6'>
        <HomeSection
          listings={listingsPerSection.offers}
          title='Recent offers'
          subtitle='View more offers'
        />
      </div>

      <div className='max-w-6xl mx-auto pt-4 space-y-6'>
        <HomeSection
          listings={listingsPerSection.forRent}
          title='Places for rent'
          subtitle='View more...'
        />
      </div>

      <div className='max-w-6xl mx-auto pt-4 space-y-6'>
        <HomeSection
          listings={listingsPerSection.forSale}
          title='Places for sale'
          subtitle='View more...'
        />
      </div>
    </>

  )
}