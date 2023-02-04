import React from 'react'
import { Navigate, Outlet } from 'react-router';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Loader from './loader/Loader';

const PrivateRoute = () => {
   const {loggedIn, checkStatus}= useAuthStatus()
   if(checkStatus){
    return <Loader/>
   }
  return (
   loggedIn? <Outlet/> : <Navigate to="/sign-up"/>
  )
}

export default PrivateRoute
