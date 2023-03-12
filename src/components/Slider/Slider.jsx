import React from 'react';
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { formatToCurrency } from 'utils';
import 'swiper/css/bundle';

export function Slider({ listings }) {
  const navigate = useNavigate()
  SwiperCore.use([Autoplay, Navigation, Pagination, EffectFade]);

  return (
    <Swiper
      pagination={{ type: "progressbar" }}
      modules={[EffectFade]}
      autoplay={{ delay: 3000 }}
      slidesPerView={1}
      effect="fade"
      navigation
    >
      {listings.map(listing => (
        <SwiperSlide
          key={listing.id}
          onClick={() => navigate(`/category/${listing.data.type}/${listing.id}`)}
        >
          <div
            className='w-full h-[300px] md:h-[450px] bg-cover bg-center bg-no-repeat overflow-hidden relative'
            style={{ backgroundImage: `url(${listing.data.imgUrls[0]})` }}
          >
            <p className='text-[#f1faee] absolute left-1 top-4 font-medium 
            max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl'>
              {listing.data.name}
            </p>
            <p className='text-[#f1faee] absolute left-1 bottom-2 font-semibold
             max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl'>
              ${formatToCurrency(listing.data.discountedPrice || listing.data.price)}
              {listing.data.type === 'rent' && ' / month'}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
