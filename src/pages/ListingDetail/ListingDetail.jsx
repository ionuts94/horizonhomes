import { useState } from 'react';
import { FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa';
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination } from 'swiper';
import { FullWidthButton, SquareSpinner, Contact } from 'components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
import { useFetchListing } from 'hooks';
import { formatToCurrency } from 'utils';
import { toast } from 'react-toastify';

import 'swiper/css/bundle';

export function ListingDetail() {
  const { listingId } = useParams();
  const { data, fetchLoading } = useFetchListing(listingId);

  console.log(data);

  const [showContactForm, setShowContactForm] = useState(false);

  const dataIsEmpty = Object.keys(data).length === 0;

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link coppied to clipboard', { autoClose: 1000 })
  }

  function doShowContactForm() {
    setShowContactForm(true);
  }

  if (fetchLoading || dataIsEmpty) {
    return <SquareSpinner />
  }

  return (
    <main>
      <Swiper
        pagination={{ type: 'progressbar' }}
        autoplay={{ delay: 3000 }}
        modules={[EffectFade]}
        slidesPerView={1}
        effect='fade'
        navigation
      >
        {data?.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className='relative w-full overflow-hidden h-[300px] md:h-[450px]'
              style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='absolute top-[10%] right-[3%] z-10 w-12 h-12
       bg-white cursor-pointer rounded-full border-2 border-gray-400
       flex justify-center items-center hover:scale-110 transition duration-200'
        onClick={copyToClipboard}
      >
        <FaShare className='text-xl text-slate-500' />
      </div>

      <div className='flex flex-col md:flex-row bg-white max-w-6xl 
      lg:mx-auto p-4 rounded-lg shadow-lg lg:space-x-5'>
        <div className='w-full h-fit lg:h-[400px]'>
          <p className='text-2xl font-bold mb-3 text-blue-900'>
            {data.name} - ${formatToCurrency(data.offer ? data.discountedPrice : data.price)}
            {data.type === 'rent' && ' / month'}
          </p>

          <p className='flex items-center mt-6 mb-3 font-semibold gap-1'>
            <FaMapMarkerAlt className='text-green-700' />
            {data.address}
          </p>

          <div className='flex justify-start items-center space-x-4 w-[75%]'>
            <p className='bg-red-800 w-full max-w-[200px] rounded-md p-1
             text-white text-center font-semibold shadow-md'>
              {data.type === 'rent' ? 'Rent' : 'Sale'}
            </p>
            {data.offer &&
              <p className='bg-green-800 w-full max-w-[200px] rounded-md p-1
              text-white text-center font-semibold shadow-md'>
                ${`${data.price - data.discountedPrice}`} discount
              </p>
            }
          </div>

          <p className='mt-3 mb-3 '>
            <span className='font-semibold'>Description - </span>
            {data.description}
          </p>

          <ul className='flex items-center space-x-2 lg:space-x-10 text-sm font-semibold'>
            <li className='flex items-center gap-2 whitespace-nowrap'>
              <FaBed className='text-lg' />
              {data.bedrooms > 1 ? `${data.bedrooms} Beds` : `${data.bedrooms} Bed`}
            </li>

            <li className='flex items-center gap-2 whitespace-nowrap'>
              <FaBath className='text-lg' />
              {data.bathrooms > 1 ? `${data.bathrooms} Baths` : `${data.bathrooms} Bath`}
            </li>

            <li className='flex items-center gap-2 whitespace-nowrap'>
              <FaParking className='text-lg' />
              {data.parking ? 'Parking spot' : 'No parking'}
            </li>

            <li className='flex items-center gap-2 whitespace-nowrap'>
              <FaChair className='text-lg' />
              {data.furnished ? 'Furnished' : 'Not furnished'}
            </li>
          </ul>

          {/* {!showContactForm &&
            <FullWidthButton
              className='mt-6'
              onClick={doShowContactForm}
            >
              Contact Landlord
            </FullWidthButton>
          }

          {showContactForm &&
            <Contact
              ownerId={data.owner}
              listing={data}
            />
          } */}
        </div>
        <div className='w-full h-[200px] mt-[200px] lg:h-[400px] md:mt-0 md:ml-2 z-10 overflow-x-hidden'>
          <MapContainer
            center={[data.geolocation.lat, data.geolocation.lng]}
            scrollWheelZoom={true}
            zoom={13}
            style={{
              height: '100%',
              width: '100%'
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[data.geolocation.lat, data.geolocation.lng]}>
              <Popup>
                {data.address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  )
}
