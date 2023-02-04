import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Profile = () => {
    const navigate=useNavigate();
    const auth=getAuth();
    const[formData, setFormData]=useState({
        name:auth.currentUser.displayName,
        email:auth.currentUser.email
    })

    const {name, email}=formData;
    console.log(name, email);
    

    const logout=()=>{
        signOut(auth);
        navigate('/');
    }

    return (
        <>
        <section className='max-w-7xl m-auto mt-6 p-4 mb-6 md:py-4 md:mx-3'>
            <h1 className='text-3xl font-semibold pt-6'>My Profile</h1>
            <p className='text-sm text-gray-500 mt-1 mb-6'>We are glad to see you again!</p>
            <div className='bg-white rounded-md flex flex-col md:justify-between md:flex-row'>
                <h2 className='mx-6 my-3 md:py-6'>Profile information</h2>
                <div className='w-3/4 m-6'>
                    <form className='md:m-6 md:py-6'>
                        <input type="text" className='w-full border border-slate-300 p-2 rounded-md mb-3' disabled id='name' value={name} />
                        <input type="email" className='w-full border border-slate-300 p-2 rounded-md' disabled id='email' value={email} />
                        <div className='flex flex-col md:flex-row md:justify-between'>
                            <p className='text-xs md:text-sm mt-3 text-gray-400'>Do you want to change your username?
                                <span className='ml-1 font-semibold text-red-400 hover:text-red-600 cursor-pointer'>Edit</span>
                            </p>
                            <p onClick={logout} className='font-semibold text-sm text-sm text-violet-400 hover:text-violet-600 transition duration-300 ease-in-out cursor-pointer mt-3'>Sign out</p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        </>
    );
}

export default Profile;
