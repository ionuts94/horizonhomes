import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { MdLocationOn, MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { formatToCurrency } from 'utils';

export function ListingItem({ listing, id, onEdit, onDelete }) {
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
            {formatToCurrency(listing.offer ? listing.discountedPrice : listing.price)}
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

      {onDelete &&
        <FaTrash
          className='absolute bottom-2 right-2 h-[14px] 
          cursor-pointer text-red-500'
          onClick={onDelete} />
      }
      {onEdit &&
        <MdEdit
          className='absolute bottom-2 right-7 h-4 
          cursor-pointer'
          onClick={onEdit} />
      }
    </li>
  )
}
