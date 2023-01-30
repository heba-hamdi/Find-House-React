import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


const Header = () => {
  let location = useLocation();
  const navigate = useNavigate();

  console.log(location)
  const pathMatchRoute = (path) => {
    if (path === location.pathname) { return true }
  }
  return (
    <div>
      <header className='m-auto flex justify-between items-center bg-white border-b shadow-sm px-5'>
        <div className='flex items-center py-3 cursor-pointer' onClick={() => navigate('/')}>
          <img src="https://creativelayers.net/themes/findhouse-html/images/header-logo2.png" alt="" />
          <h3 className='text-2xl mx-3'>FindHouse</h3>
        </div>
        <ul className='flex space-x-10 '>
          <li className={`text-gray-500 py-5 border-b-[4px] border-b-transparent cursor-pointer ${pathMatchRoute('/') && "border-b-red-500"}`} onClick={() => navigate('/')}>Home</li>
          <li className={`text-gray-500 py-5 border-b-[4px] border-b-transparent cursor-pointer ${pathMatchRoute('/offers') && "border-b-red-500"}`} onClick={() => navigate('/offers')}>Offers</li>
          <li className={`text-gray-500 py-5 border-b-[4px] border-b-transparent cursor-pointer ${pathMatchRoute('/sign-in') && "border-b-red-500"}`} onClick={() => navigate('/sign-in')}>Sign in</li>
        </ul>
      </header>
    </div>
  )
}

export default Header
