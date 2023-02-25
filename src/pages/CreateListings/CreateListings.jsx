import { useState } from 'react';
import { Form, PageWrapper, ListingFormButton, FullWidthButton } from 'components';
import React from 'react';

export function CreateListing() {
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: true,
    furnished: false,
    address: '',
    description: '',
    offer: true,
    price: 0,
    discountedPrice: 0,
  });

  function onChange(e) { console.log(e) }

  return (
    <PageWrapper>
      <main >
        <h1 className='text-3xl text-center mt-6 font-bold'>
          Createa a Listing
        </h1>

        <Form>
          <Form.Label>
            Sell / Rent
          </Form.Label>

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

          <Form.Label>
            Name
          </Form.Label>

          <Form.Input
            className=''
            onCustomChange={onChange}
            type='text'
            id='name'
            value={formData.name}
            placeholder='Name'
            minLength="5"
            required
          />

          <div className='flex gap-[20px] mb-6'>
            <div className=''>
              <Form.Label className='mt-0'>
                Beds
              </Form.Label>

              <Form.Input
                type='number'
                id='bedrooms'
                value={formData.bedrooms}
                onCustomChange={onChange}
                min='1'
                max='12'
                required
              />
            </div>

            <div className=''>
              <Form.Label className='mt-0'>
                Baths
              </Form.Label>

              <Form.Input
                type='number'
                id='bathrooms'
                value={formData.bathrooms}
                onCustomChange={onChange}
                min='1'
                max='12'
                required
              />
            </div>
          </div>

          <Form.Label>
            Parking spot
          </Form.Label>

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

          <Form.Label>
            Furnished
          </Form.Label>

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

          <Form.Label>
            Address
          </Form.Label>

          <Form.Input
            required
            as='textarea'
            id='address'
            type='text'
            placeholder='Address'
            value={formData.address}
            onCustomChange={onChange}
          />

          <Form.Label className='mt-0'>
            Description
          </Form.Label>

          <Form.Input
            required
            as='textarea'
            id='description'
            type='text'
            onCustomChange={onChange}
            value={formData.description}
            placeholder='Description'
          />

          <Form.Label className='mt-0'>
            Offer
          </Form.Label>

          <div className='flex justify-between gap-5 mb-6'>
            <ListingFormButton
              id='offer'
              value={true}
              onClick={onChange}
              selected={formData.offer}
            >
              Yes
            </ListingFormButton>

            <ListingFormButton
              id='offer'
              value={true}
              onClick={onChange}
              selected={!formData.offer}
            >
              No
            </ListingFormButton>
          </div>

          <div className='block gap-[20px] mb-6 w-full'>
            <Form.Label className='mt-0'>
              Regular price
            </Form.Label>
            <div className='flex items-center gap-4'>
              <Form.Input
                required
                min='50'
                max='400000'
                id='price'
                type='number'
                onCustomChange={onChange}
                value={formData.price}
                className='w-full mb-0 text-center'
              />

              <p className='text-md w-full whitespace-nowrap'>
                {formData.type === 'rent' && '$ / Month'}
              </p>
            </div>
          </div>

          {formData.offer && (
            <div className='block gap-[20px] mb-6 w-full'>
              <Form.Label className='mt-0'>
                Discounted price
              </Form.Label>

              <div className='flex items-center gap-4'>
                <Form.Input
                  required={formData.offer}
                  min='50'
                  max='400000'
                  id='discountedPrice'
                  type='number'
                  onCustomChange={onChange}
                  value={formData.discountedPrice}
                  className='w-full mb-0 text-center'
                />

                <p className='text-md w-full whitespace-nowrap'>
                  {formData.type === 'rent' && '$ / Month'}
                </p>
              </div>
            </div>
          )}

          <div className='mb-6'>
            <Form.Label className='mt-0'>
              Pictures
            </Form.Label>

            <p className='text-gray-600'>
              The first image will be the cover (max 6)
            </p>

            <Form.Input
              required
              multiple
              type='file'
              id='images'
              accept='.jpg,.png,.jpeg'
              onCustomChange={onChange}
              className='px-3 py-1.5 text-gray-700  border border-gray-300 rounded'
            />
          </div>

          <FullWidthButton className='mb-8'>
            Create Listing
          </FullWidthButton>
        </Form>
      </main>
    </PageWrapper>
  )
}
