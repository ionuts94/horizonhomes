import React from 'react';
import spinner from 'assets/spinner.svg';

export function Spinner({ size = 'sm', color = 'white' }) {
  const sizes = {
    sm: 'h-[20px] w-[20px]',
    md: 'h-[30px] w-[30px]',
    lg: 'h-[40px] w-[40px]'
  }

  return (
    <div className={`animate-spin ${sizes[size]} rounded-full border-[3px] border-t-${color} border-l-${color} border-r-${color} border-b-transparent`}></div>
  )
}

export function SquareSpinner() {
  return (
    <div className='w-full h-full bg-black bg-opacity-50 flex items-center justify-center fixed left-0 bottom-0 top-0 z-50'>
      <div>
        <img
          className='h-24'
          src={spinner}
          alt='svg-spinner'
        />
      </div>
    </div>
  )
}