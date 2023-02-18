import React from 'react';
import SignInImage from 'assets/sign-in.avif';
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom';
import { FullWidthButton, Form } from 'components';
import { ResetPasswordButton } from 'components/Buttons/FullWidthButton';

export function ForgotPassword() {
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Forgot password</h1>
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

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Don't have an account?
                <Link to='/sign-up' className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'>Register</Link>
              </p>
            </div>

            <ResetPasswordButton
              type='submit'
            />

            <div className='my-4 flex tems-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>

            <FullWidthButton
              classNames='bg-red-600 hover:bg-red-700 active:bg-red-800 flex items-center justify-center'
            >
              <FcGoogle className='text-2xl bg-white rounded-full mr-2' />
              CONTINUE WITH GOOGLE
            </FullWidthButton>
          </Form>
        </div>
      </div>
    </section>
  )
}
