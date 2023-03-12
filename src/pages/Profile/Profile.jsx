import React, { useEffect, useState } from 'react';
import { Form, FullWidthButton, ListingItem, SquareSpinner } from 'components';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from 'firebaseConfig';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FcHome } from 'react-icons/fc';
import { useFetchListings } from 'hooks';

export function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [changeDetailState, setChangeDetailState] = useState('Edit');
  const [shouldUpdateListings, setShouldUpdateListings] = useState(1);

  const { listings, fetchLoading } = useFetchListings({ shouldUpdateListings });

  function logOut() {
    auth.signOut();
    navigate('/');
  }

  useEffect(() => {
    setName(auth.currentUser.displayName)
    setEmail(auth.currentUser.email);
  }, [])

  function handleChangeDetails() {
    if (changeDetailState === 'Edit') {
      setChangeDetailState('Apply changes');
      setInputsDisabled(false);
    } else {
      onSubmitChangeDetails();
      setChangeDetailState('Edit')
      setInputsDisabled(true);
    }
  }

  async function onSubmitChangeDetails() {
    try {
      if (name) {
        await updateProfile(auth.currentUser, {
          displayName: name
        });

        const userDocRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, {
          name: name,
          email: email,
        })

        toast.success('Profile details updated', { autoClose: 1000, pauseOnHover: false });
      }
    } catch (err) {
      toast.error('Could not update profile details');
    }
  }

  async function onDelete(listingId) {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await deleteDoc(doc(db, 'listings', listingId));
        setShouldUpdateListings(shouldUpdateListings => shouldUpdateListings + 1);
        toast.success('Listing deleted.');
      } catch (err) {
        toast.error(err.message);
      }
    }
  }

  function onEdit(listingId) {
    navigate(`/edit-listing/${listingId}`);
  }

  if (fetchLoading) {
    return <SquareSpinner />
  }

  return (
    <section className='max-w-6xl mx-auto'>
      <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
      <div className='w-full md:w-[50%] mx-auto mt-6 px-3'>
        <Form>
          <Form.Input
            type='text'
            id='name'
            value={name}
            disabled={inputsDisabled}
            className={`${inputsDisabled ? 'bg-gray-200' : ''}`}
            onCustomChange={e => setName(e.target.value)}
          />
          <Form.Input
            type='email'
            id='email'
            value={email}
            disabled={inputsDisabled}
            className={`${inputsDisabled ? 'bg-gray-200' : ''}`}
            onCustomChange={e => setEmail(e.target.value)}
          />

          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p className='flex items-center'>
              Do you want to change your details?
              <button className='text-red-600 hover:text-red-700 tramsition ease-in-out duration-200 ml-1 cursor-pointer'
                onClick={handleChangeDetails}
                type='submit'
              >
                {changeDetailState}
              </button>
            </p>
            <p className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer'
              onClick={logOut}
            >
              Sign out
            </p>
          </div>

        </Form>

        <FullWidthButton>
          <Link className='flex justify-center items-center gap-2'
            to='/create-listing'>
            <FcHome className='font-medium text-3xl rounded-full border-2 bg-red-400' />
            Sell or rent your home
          </Link>
        </FullWidthButton>
      </div>

      {listings.length > 0 &&
        <div className='max-w-6xl px-3 mt-6 mx-auto'>
          <h2 className='text-2xl text-center font-semibold mb-6 mt-6'>
            My Listings
          </h2>

          <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 
          xl:grid-cols-4 2xl:grid-cols-5 mt-6 mb-6'>
            {listings.map(listing => (
              <ListingItem
                key={listing.id}
                id={listing.id}
                listing={listing.data}
                onDelete={() => onDelete(listing.id)}
                onEdit={() => onEdit(listing.id)}
              />
            ))}
          </ul>
        </div>
      }
    </section>
  )
}
