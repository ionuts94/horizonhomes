import React from 'react'

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
