import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import { useAuthState } from 'hooks';
import { db } from 'firebaseConfig';
import { useNavigate } from 'react-router-dom';

import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import {
  addDoc,
  serverTimestamp,
  collection
} from 'firebase/firestore';

const GOOGLE_API_KEY = process.env.REACT_APP_GEOCODING_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

export function useSubmitListing() {
  const auth = useAuthState();
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);

  async function submitListing(data) {
    console.log(data);
    setSubmitLoading(true);

    if (data.discountedPrice >= data.price) {
      throwCustomError('Regular price must be higher than discounted price.')
      return;
    }

    if (data.images.length < 1 || data.images.length > 6) {
      throwCustomError('You cannot submit a listing without images or with more than 6 images.');
      return;
    }

    let geolocation = {};
    if (data.geolocationEnabled) {
      const response = await fetch(`${BASE_URL}?address=${data.address}&key=${GOOGLE_API_KEY}`);
      const resp_data = await response.json();

      geolocation.lat = resp_data.results[0]?.geometry.location.lat || 0;
      geolocation.lng = resp_data.results[0]?.geometry.location.lng || 0;

      if (!resp_data.results.length) {
        throwCustomError('The address is invalid. Please enter a valid address');
        return;
      }
    } else {
      geolocation.lat = data.latitude;
      geolocation.lng = data.longitude;
    }

    const imgUrls = await Promise.all(
      [...data.images].map(image =>
        storeImage(image)
      )
    ).catch(err => {
      throwCustomError(err.message);
      return;
    })

    const formDataCopy = {
      ...data,
      owner: auth.user.uid,
      imgUrls,
      geolocation,
      created: serverTimestamp()
    }

    delete formDataCopy.images;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    !formDataCopy.offer && delete formDataCopy.offer;

    const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
    showActionSuccess('Listing created');
    navigate(`/category/${data.type}/${docRef.id}`);
  }

  async function storeImage(image) {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = `${auth.user.uid}-${image.name}-${uuid()}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          // switch (snapshot.state) {
          //   case 'paused':
          //     console.log('Upload is paused');
          //     break;
          //   case 'running':
          //     console.log('Upload is running');
          //     break;
          // }
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );

    })
  }

  function throwCustomError(errMessage) {
    toast.error(errMessage);
    setSubmitLoading(false);
  }

  function showActionSuccess(successMessage) {
    toast.success(successMessage);
    setSubmitLoading(false);
  }

  return { submitListing, submitLoading }
}

