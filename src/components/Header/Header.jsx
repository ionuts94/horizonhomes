import React from 'react';
import HorizonLogo from '../../assets/hh-logo.png'

export function Header() {
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img className="h-12 cursor-pointer" src={HorizonLogo} alt="logo" />
        </div>

        <div>
          <ul className="flex space-x-10">
            <li>Home</li>
            <li>Offers</li>
            <li>SignIn</li>
          </ul>
        </div>

      </header>
    </div>
  )
}
