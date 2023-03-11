import React from 'react';
import { Form, FullWidthButton } from 'components';
import { useFetchOwner } from 'hooks';

export function Contact({ ownerId, listing }) {
  const { ownerData, fetchOwnerLoading } = useFetchOwner(ownerId);

  return (
    <div>
      <p>Contact {ownerData.name} for the {listing.name.toLowerCase()}</p>
      <Form>
        <Form.Input
          as='textarea'
          id='message'
          rows='2'
        />
        {/* To be finished */}

      </Form>
    </div>
  )
}
