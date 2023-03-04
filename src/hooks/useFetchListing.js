import { useState, useEffect, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from 'firebaseConfig';

export function useFetchListing(listingId) {
  const startedFetching = useRef(false);

  const [fetchLoading, setFetchLoading] = useState();
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchListing() {
      setFetchLoading(true);
      startedFetching.current = true;

      try {
        const docRef = doc(db, 'listings', listingId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error('You are not allowed to edit this listing');
        }
        setData(docSnap.data());
      } catch (e) {
        toast.error(e.message);
      } finally {
        startedFetching.current = false;
        setFetchLoading(false);
      }
    }

    if (listingId && !startedFetching.current) {
      fetchListing();
    }

  }, [listingId])

  return { data, fetchLoading }
}
