import React from 'react'
import { useGoogleSignUp } from 'hooks'
import { Spinner } from 'components/Spinner/Spinner'


export function FullWidthButton({ children, onClick = () => null, disabled, classNames, type }) {
  return (
    <button
      className={`w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 ${classNames}`}
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function SignInButton({ ...rest }) {
  return (
    <FullWidthButton {...rest}>
      SIGN IN
    </FullWidthButton>
  )
}

export function SignUpButton({ isLoading = false, ...rest }) {
  return (
    <FullWidthButton
      classNames='flex items-center justify-center'
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
      classNames='bg-red-600 hover:bg-red-700 active:bg-red-800 flex items-center justify-center'
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
      classNames='flex items-center justify-center'
      {...rest}
    >
      {isLoading
        ? <Spinner />
        : 'RESET PASSWORD'
      }
    </FullWidthButton>
  )
}