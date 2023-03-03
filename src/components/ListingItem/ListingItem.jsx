import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export function ListingItem({ listing, id }) {
  return (
    <li className='bg-white flex flex-col justify-between 
    items-center shadow-md hover:shadow-xl rounded-md overflow-hidden
    transition-shadow duration-150 relative m-[10px]'>
      <Link className='contents' to={`/category/${listing.type}/${id}`}>
        <img
          className='h-[170px] w-full object-cover hover:scale-105
          transition-scale duration-200 ease-in'
          src={listing.imgUrls[0]}
          loading='lazy'
        />

        <Moment
          className='absolute top-2 left-2 bg-[#3377cc] text-white
          rounded-md uppercase text-xs font-semibold px-2 py-1 shadow-lg'
          fromNow
        >
          {listing.created?.toDate()}
        </Moment>

        <div className='w-full p-[10px]'>
          <div className='flex items-center space-x-1'>
            <MdLocationOn className='h-4 w-4 text-green-600' />
            <p className='font-semibold text-sm mb-[2px] text-gray-600 truncate'>{listing.address}</p>
          </div>

          <p className='font-semibold m-0 text-xl truncate'>
            {listing.name}
          </p>
          <p className='text-[#457b9d] mt-2 font-semibold'>$
            {(listing.offer
              ? listing.discountedPrice
              : listing.price)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' && " / month"}
          </p>
          <div className='flex items-center mt-[10px] space-x-3'>
            <p className='text-sm font-bold'>
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
            </p>
            <p className='text-sm font-bold'>
              {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
            </p>
          </div>
        </div>


      </Link>
    </li>
  )
}
