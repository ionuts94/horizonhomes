import React from 'react'
import { useGoogleSignUp } from 'hooks'
import { Spinner } from 'components/Spinner/Spinner'


export function FullWidthButton({ children, onClick = () => null, disabled, className, type }) {
  return (
    <button
      className={`w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 ${className}`}
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function SignInButton({ isLoading = false, ...rest }) {
  return (
    <FullWidthButton
      className='flex items-center justify-center'
      {...rest}
    >
      {isLoading
        ? <Spinner />
        : 'SIGN IN'
      }
    </FullWidthButton>
  )
}

export function SignUpButton({ isLoading = false, ...rest }) {
  return (
    <FullWidthButton
      className='flex items-center justify-center'
      {...rest}
    >
      {isLoading
        ? <Spinner />
        : 'SIGN UP'
      }
    </FullWidthButton>
  )
}

export function SignWithGoogleButton({ ...rest }) {
  const { googleSignUp, googleAuthLoading } = useGoogleSignUp();

  return (
    <FullWidthButton
      className='bg-red-600 hover:bg-red-700 active:bg-red-800 flex items-center justify-center'
      {...rest}
      onClick={googleSignUp}
    >
      {googleAuthLoading
        ? <Spinner />
        : 'CONTINUE WITH GOOGLE'
      }
    </FullWidthButton>
  )
}

export function ResetPasswordButton({ isLoading = false, ...rest }) {
  return (
    <FullWidthButton
      className='flex items-center justify-center'
      {...rest}
    >
      {isLoading
        ? <Spinner />
        : 'RESET PASSWORD'
      }
    </FullWidthButton>
  )
}

export function ListingFormButton({ isLoading = false, children, selected, ...rest }) {
  return (
    <FullWidthButton
      className={`${selected ? 'bg-slate-600 text-white hover:bg-slate-800 active:bg-slate-900' : 'bg-white !text-black hover:bg-gray-100 active:bg-gray-200'} px-7 py-3 font-medium text-sm uppercase shadow-md w-full focus:shadow-lg active:shadow-lg`}
      {...rest}
    >
      {isLoading
        ? <Spinner />
        : children
      }
    </FullWidthButton>
  )
}