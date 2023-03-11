import React, { useEffect, useState } from 'react';
import { db } from 'firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export function useFetchOwner(ownerId) {
  const [fetchOwnerLoading, setFetchOwnerLoading] = useState(false);
  const [ownerData, setOwnerData] = useState({});

  useEffect(() => {
    async function getOwnerData() {
      if (!ownerId) return;

      setFetchOwnerLoading(true);
      try {
        const docRef = doc(db, 'users', ownerId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error(`Could not fetch data for owner: ${ownerId}`);
        }

        setOwnerData(docSnap.data());
      } catch (e) {
        toast.error(e);
      } finally {
        setFetchOwnerLoading(false);
      }
    }
    getOwnerData();
  }, [ownerId])

  return { fetchOwnerLoading, ownerData }
}
