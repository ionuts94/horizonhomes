import { useState } from 'react';
import { Form, PageWrapper, ListingFormButton } from 'components';
import React from 'react';

export function CreateListing() {
  const [formData, setFormData] = useState({
    type: 'rent',
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

          <div className='flex justify-between gap-2'>
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
        </Form>
      </main>
    </PageWrapper>
  )
}
