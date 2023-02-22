import React from 'react';

export function PageWrapper({ children }) {
  return (
    <section className='max-w-md px-2 mx-auto'>
      {children}
    </section>
  )
}
