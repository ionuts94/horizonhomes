import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignInImage from 'assets/sign-in.avif';
import { SignUpButton, Form, SignWithGoogleButton } from 'components';

export function SignIn() {
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img className='w-full rounded-2xl' src={SignInImage} alt='sign-in-key' />
        </div>

        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <Form>
            <Form.Input
              type='email'
              id='email'
              placeholder='Email'
            />

            <Form.Input
              type='password'
              id='password'
              placeholder='Password'
            />

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Don't have an account?
                <Link to='/sign-up' className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'>Register</Link>
              </p>
              <p>
                <Link to='/forgot-password' className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out ml-1'>Forgot password?</Link>
              </p>
            </div>

            <SignUpButton
              type='submit'
              onClick={(data) => console.log(data)}
            />

            <div className='my-4 flex tems-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>

            <SignWithGoogleButton />
          </Form>
        </div>
      </div>
    </section>
  )
}
