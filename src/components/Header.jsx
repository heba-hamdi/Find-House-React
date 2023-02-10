import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {AiOutlineUser,AiOutlinePlus} from 'react-icons/ai'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

const Header = () => {
  const [navLinkState, setNavLinkState]=useState("Login/Registeration");
  const [loggedUser, setLoggedUser]=useState(false);
  let location = useLocation();
  const navigate = useNavigate();

  
  const pathMatchRoute = (path) => {
    if (path === location.pathname) { return true }
  }

 useEffect(() => {
  const auth = getAuth();
  onAuthStateChanged(auth,(user)=>{
    if(user){
      setNavLinkState("Profile");
      setLoggedUser(true)
    }else{
      setNavLinkState("Login/Registeration")
      setLoggedUser(false)
    }
  })

 }, []);
//  console.log(navLink);



  return (
    <div>
      <header className=' m-auto flex justify-between items-center bg-white border-b shadow-sm px-7'>
        <div className='flex items-center py-3 cursor-pointer' onClick={() => navigate('/')}>
          <img src="https://creativelayers.net/themes/findhouse-html/images/header-logo2.png" alt="" />
          <h3 className='text-2xl mx-3'>FindHouse</h3>
        </div>
        <ul className='invisible flex md:space-x-10 md:visible'>
          <li className={`text-gray-500 py-5 border-b-[4px] border-b-transparent cursor-pointer ${pathMatchRoute('/') && "border-b-red-500"}`} onClick={() => navigate('/')}>Home</li>
          <li className={`text-gray-500 py-5 border-b-[4px] border-b-transparent cursor-pointer ${pathMatchRoute('/offers') && "border-b-red-500"}`} onClick={() => navigate('/offers')}>Offers</li>
          <li className={`text-gray-500 py-5 border-b-[4px] border-b-transparent cursor-pointer flex items-center flex-nowrap ${pathMatchRoute('/sign-in')? "border-b-red-500": "" } || ${pathMatchRoute('/sign-up') ? "border-b-red-500": "" } || ${pathMatchRoute('/profile')? "border-b-red-500": "" }`} onClick={() => (navigate('/profile'))}><AiOutlineUser className='text-2xl'/>{navLinkState}</li>
          
            <button className='bg-red-500 text-white rounded-3xl px-3 m-3 hover:bg-red-600'>
            <Link to={loggedUser? "/create-listing": "/sign-in"} className='flex justify-center items-center'><AiOutlinePlus className='text-white mr-1'/> <span className='mr-1'>Create Listing</span></Link>
            </button>
          
        </ul>
      </header>
    </div>
  )
}

export default Header
