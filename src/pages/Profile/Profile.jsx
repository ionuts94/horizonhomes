import React from 'react';
import { Form } from 'components';
import { useNavigate } from 'react-router-dom';
import { auth } from 'firebaseConfig';

export function Profile() {
  const navigate = useNavigate();

  function logOut() {
    auth.signOut();
    navigate('/');
  }

  return (
    <section className='max-w-6xl mx-auto'>
      <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
      <div className='w-full md:w-[50%] mx-auto mt-6 px-3'>
        <Form>
          <Form.Input
            type='text'
            id='name'
            value={''}
          />
          <Form.Input
            type='email'
            id='email'
            value={''}
          />
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p className='flex items-center'>
              Do you want to change your details?
              <span className='text-red-600 hover:text-red-700 tramsition ease-in-out duration-200 ml-1 cursor-pointer'>
                Edit
              </span>
            </p>
            <p className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer'
              onClick={logOut}
            >
              Sign out
            </p>
          </div>

        </Form>
      </div>
    </section>
  )
}
