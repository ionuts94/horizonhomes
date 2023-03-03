import { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { useAuthState } from './useAuthState';
import { toast } from 'react-toastify';

export function useFetchListings(shouldUpdateListings) {
  const auth = useAuthState();
  const [fetchLoading, setFetchLoading] = useState();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchUserListings() {
      console.log('fetching');
      if (!auth?.user?.uid) {
        return;
      }

      setFetchLoading(true);

      try {
        const listingsCollectionRef = collection(db, 'listings');
        const q = query(listingsCollectionRef, where('owner', '==', auth?.user?.uid), orderBy('created', 'desc'));
        const querySnap = await getDocs(q);
        const listingsCopy = [];

        for (let doc of querySnap.docs) {
          listingsCopy.push({
            id: doc.id,
            data: doc.data()
          })
        }

        setListings(listingsCopy);
      } catch (err) {
        toast.error(err.message)
      } finally {
        setFetchLoading(false);
      }
    }

    fetchUserListings();
  }, [auth?.user?.uid, shouldUpdateListings])


  return { fetchLoading, listings }
}
