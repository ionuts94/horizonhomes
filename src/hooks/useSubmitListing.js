import { useState } from 'react';
import { toast } from 'react-toastify';

export function useSubmitListing() {
  const [submitLoading, setSubmitLoading] = useState(false);

  async function submitListing(data) {
    console.log(data);
    setSubmitLoading(true);

    if (data.discountedPrice >= data.price) {
      toast.error('Regular price must be higher than discounted price.');
      setSubmitLoading(false);
      return;
    }


  }

  return { submitListing, submitLoading }
}

