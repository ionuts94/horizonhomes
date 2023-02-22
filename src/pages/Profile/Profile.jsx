import React, { useEffect, useState } from 'react';
import { Form, FullWidthButton } from 'components';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from 'firebaseConfig';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { FcHome } from 'react-icons/fc';

export function Profile() {
  const navigate = useNavigate();
  const [changeDetailState, setChangeDetailState] = useState('Edit');
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
    </section>
  )
}
