import React from 'react';
import { ListingItem } from 'components';
import { Link } from 'react-router-dom';

export function HomeSection({ listings, title, subtitle, link }) {
  return (
    <div className='m-2 mb-6'>
      <h2 className='px-3 text-2xl mt-6 font-semibold'>
        {title}
      </h2>
      <Link to={link || '/offers'}>
        <p className='px-3 tex-sm text-blue-600 w-fit
            hover:text-blue-800 transition duration-150 ease-in-out'>
          {subtitle}
        </p>
      </Link>
      <div className={`${listings.length === 0 && 'flex justify-center items-center'}`}>
        {listings.length === 0 &&
          <p className='text-[#bbb]'>
            There are no {title.toLowerCase()} for now. Please come back later.
          </p>
        }
        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-[150px]'>
          {listings.map(listing => (
            <ListingItem
              key={listing.id}
              listing={listing.data}
              id={listing.id}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
