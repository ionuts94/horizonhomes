import React from 'react'

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
