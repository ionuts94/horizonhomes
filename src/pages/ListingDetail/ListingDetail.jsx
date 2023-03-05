import React from 'react';
import { useFetchListing } from 'hooks';
import { useParams } from 'react-router-dom';
import { SquareSpinner } from 'components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination } from 'swiper';

import 'swiper/css/bundle';


export function ListingDetail() {
  const { listingId } = useParams();
  const { data, fetchLoading } = useFetchListing(listingId);
  const dataIsEmpty = Object.keys(data).length === 0;

  SwiperCore.use([Autoplay, Navigation, Pagination]);

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
              className='relative w-full overflow-hidden h-[300px]'
              style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  )
}
