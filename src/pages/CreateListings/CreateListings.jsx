import { useState } from 'react';
import { Form, PageWrapper, ListingFormButton } from 'components';
import React from 'react';

export function CreateListing() {
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: true,
    furnished: false
  });

  function onChange(e) { console.log(e) }

  return (
    <PageWrapper>
      <main >
        <h1 className='text-3xl text-center mt-6 font-bold'>
          Createa a Listing
        </h1>

        <Form>
          <p className='text-lg mt-6 font-semibold'>
            Sell / Rent?
          </p>

          <div className='flex justify-between gap-5'>
            <ListingFormButton
              id='type'
              value='sale'
              onClick={onChange}
              selected={formData.type === 'sale'}
            >
              Sell
            </ListingFormButton>

            <ListingFormButton
              id='type'
              value='rent'
              onClick={onChange}
              selected={formData.type === 'rent'}
            >
              Rent
            </ListingFormButton>
          </div>

          <p className='text-lg mt-6 font-semibold'>
            Name
          </p>

          <Form.Input
            className=''
            onChange={onChange}
            type='text'
            value={formData.name}
            placeholder='Name'
            minLength="5"
            required
          />

          <div className='flex gap-[20px] mb-6'>
            <div className=''>
              <p className='text-lg font-semibold'>Beds</p>
              <Form.Input
                type='number'
                id='bedrooms'
                value={formData.bedrooms}
                onChange={onChange}
                min='1'
                max='12'
                required
              />
            </div>

            <div className=''>
              <p className='text-lg font-semibold'>Baths</p>
              <Form.Input
                type='number'
                id='bathrooms'
                value={formData.bathrooms}
                onChange={onChange}
                min='1'
                max='12'
                required
              />
            </div>
          </div>

          <p className='text-lg mt-6 font-semibold'>
            Parking spot
          </p>

          <div className='flex justify-between gap-5'>
            <ListingFormButton
              id='parking'
              value={true}
              onClick={onChange}
              selected={formData.parking}
            >
              Yes
            </ListingFormButton>

            <ListingFormButton
              id='parking'
              value={false}
              onClick={onChange}
              selected={!formData.parking}
            >
              No
            </ListingFormButton>
          </div>

          <p className='text-lg mt-6 font-semibold'>
            Furnished
          </p>

          <div className='flex justify-between gap-5'>
            <ListingFormButton
              id='furnished'
              value={true}
              onClick={onChange}
              selected={formData.furnished}
            >
              Yes
            </ListingFormButton>

            <ListingFormButton
              id='furnished'
              value={true}
              onClick={onChange}
              selected={!formData.furnished}
            >
              No
            </ListingFormButton>
          </div>

        </Form>
      </main>
    </PageWrapper>
  )
}
