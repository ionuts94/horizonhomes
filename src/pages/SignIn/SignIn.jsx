import React, { useState } from 'react';
import SignInImage from '../../assets/sign-in.avif';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom';
import { FullWidthButton } from '../../components';

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  function onChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  function toggleShowPassword() {
    setShowPassword(showPassword => !showPassword);
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img className='w-full rounded-2xl' src={SignInImage} alt='sign-in-key' />
        </div>

        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form>
            <input
              className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
              type='email'
              id='email'
              value={formData.email}
              onChange={onChange}
              placeholder='Email address'
            />

            <div className='relative mb-6'>
              <input
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                type={`${showPassword ? 'text' : 'password'}`}
                id='password'
                value={formData.password}
                onChange={onChange}
                placeholder='Password'
              />
              {showPassword
                ? <AiFillEyeInvisible
                  onClick={toggleShowPassword}
                  className='absolute right-3 top-3 text-xl cursor-pointer'
                />
                : <AiFillEye
                  onClick={toggleShowPassword}
                  className='absolute right-3 top-3 text-xl cursor-pointer'
                />
              }
            </div>

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Don't have an account?
                <Link to='/sign-up' className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'>Register</Link>
              </p>
              <p>
                <Link to='/forgot-password' className='text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out ml-1'>Forgot password?</Link>
              </p>
            </div>

            <FullWidthButton
              type='submit'
            >
              Sign in
            </FullWidthButton>

            <div className='my-4 flex tems-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>

            <FullWidthButton
              classNames='bg-red-600 hover:bg-red-700 active:bg-red-800 flex items-center justify-center'
            >
              <FcGoogle className='text-2xl bg-white rounded-full mr-2' />
              CONTINUE WITH GOOGLE
            </FullWidthButton>

          </form>
        </div>
      </div>
    </section>
  )
}
