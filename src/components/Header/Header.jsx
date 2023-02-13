import React from 'react';
import HorizonLogo from '../../assets/hh-logo.png'
import { useLocation, useNavigate } from 'react-router-dom'

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  function pathMatchRoute(route) {
    return route === location.pathname
  }

  function handleListItemClick(e) {
    const route = e.target.dataset.route;
    navigate(route);
  }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50 h-14">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img className="h-12 cursor-pointer" src={HorizonLogo} alt="logo" />
        </div>

        <div>
          <ul className="flex space-x-10">
            <li
              onClick={handleListItemClick}
              data-route="/"
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute('/') && 'text-black border-b-red-500'}`}>
              Home
            </li>
            <li
              onClick={handleListItemClick}
              data-route="/offers"
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute('/offers') && 'text-black border-b-red-500'}`}>
              Offers
            </li>
            <li
              onClick={handleListItemClick}
              data-route="/sign-in"
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute('/sign-in') && 'text-black border-b-red-500'}`}>
              SignIn
            </li>
          </ul>
        </div>

      </header>
    </div>
  )
}
