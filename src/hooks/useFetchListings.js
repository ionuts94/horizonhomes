import { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query, where, limit } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { useAuthState } from './useAuthState';
import { toast } from 'react-toastify';

export function useFetchListings({ shouldUpdateListings = false, fetchAll }) {
  const auth = useAuthState();
  const [fetchLoading, setFetchLoading] = useState();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (fetchAll) {
      fetchAllListings()
    } else {
      fetchUserListings();
    }

  }, [auth?.user?.uid, shouldUpdateListings])

  async function fetchUserListings() {
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

  async function fetchAllListings() {
    setFetchLoading(true);

    try {
      const listingsCollectionRef = collection(db, 'listings');
      const q = query(listingsCollectionRef, orderBy('created', 'desc'));
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

  return { fetchLoading, listings }
}
