import { useState } from 'react';
import { toast } from 'react-toastify';

export function useSubmitListing() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const GOOGLE_API_KEY = process.env.REACT_APP_GEOCODING_API_KEY;
  const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

  async function submitListing(data) {
    console.log(data);
    setSubmitLoading(true);

    if (data.discountedPrice >= data.price) {
      toast.error('Regular price must be higher than discounted price.');
      setSubmitLoading(false);
      return;
    }

    if (data.images.length < 1 || data.images.length > 6) {
      toast.error('You cannot submit a listing without images or with more than 6 images.');
      setSubmitLoading(false);
      return;
    }

    let geolocation = {};
    let location;

    if (data.geolocationEnabled) {
      const response = await fetch(`${BASE_URL}?address=${data.address}&key=${GOOGLE_API_KEY}`);
      const resp_data = await response.json();

      geolocation.lat = resp_data.results[0]?.geometry.location.lat || 0;
      geolocation.lng = resp_data.results[0]?.geometry.location.lng || 0;

      if (!resp_data.results.length) {
        setSubmitLoading(false);
        toast.error('The address is invalid. Please enter a valid address');
      }
    } else {
      geolocation.lat = data.latitude;
      geolocation.lng = data.longitude;
    }




  }

  return { submitListing, submitLoading }
}

