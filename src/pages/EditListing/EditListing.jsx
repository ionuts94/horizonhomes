import React from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { SquareSpinner, Listing } from 'components';

export function EditListing() {
  const { listingId } = useParams();
  const { data, fetchLoading } = useOutletContext();

  if (fetchLoading || !listingId) {
    return <SquareSpinner />
  }

  return (
    <Listing
      data={data}
      title='Edit Listing'
      submitButtonText="Edit Listing"
      listingId={listingId}
      isEditing={true}
    />
  )
}
