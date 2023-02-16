import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from "firebase/firestore";
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import {FcHome} from 'react-icons/fc'

const Profile = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const { name, email } = formData;
    console.log(name, email);


    const logout = () => {
        signOut(auth);
        navigate('/');
    }

    const onChange = (e) => {
        setFormData((prevState) => {
            return (
                {
                    ...prevState,
                    [e.target.id]: e.target.value
                }
            )

        })
    }

    const submitChange = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                const auth = getAuth();
                await updateProfile(auth.currentUser, {
                    displayName: name
                })
                const docRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(docRef, {
                    name: name
                })

                toast.success("Username is updated")
            }



        } catch (error) {
            toast.error("Couldn't update the username")
        }
    }

    const changeandsubmit = () => {
        changeDetails && submitChange();
        setChangeDetails(prevState => !prevState)
    }

    return (
        <>
            <section className='max-w-7xl mt-6 p-4 mb-6 md:py-4 md:mx-3'>
                <h1 className='text-3xl font-semibold pt-6'>My Profile</h1>
                <p className='text-sm text-gray-500 mt-1 mb-6'>We are glad to see you again!</p>
                <div className='w-screen flex justify-start'>
                    <div className='bg-white rounded-md flex flex-col md:justify-between md:flex-row w-10/12'>
                        <h2 className='mx-6 my-3 md:py-6'>Profile information</h2>
                        <div className='w-3/4 m-6'>
                            <form className='md:m-6 md:py-6'>
                                <input type="text" className={!changeDetails ? 'w-full border border-slate-300 p-2 rounded-md mb-3' : 'w-full border border-slate-300 p-2 rounded-md mb-3 bg-red-200'} disabled={!changeDetails} id='name' value={name} onChange={onChange} />
                                <input type="email" className='w-full border border-slate-300 p-2 rounded-md' disabled id='email' value={email} />
                                <div className='flex flex-col md:flex-row md:justify-between'>
                                    <p className='text-xs md:text-sm mt-3 text-gray-400'>Do you want to change your username?
                                        <span className='ml-1 font-semibold text-red-400 hover:text-red-600 cursor-pointer' onClick={changeandsubmit}>
                                            {!changeDetails ? "Edit" : "Apply Changes"}</span>
                                    </p>
                                    <p onClick={logout} className='font-semibold text-sm text-sm text-violet-400 hover:text-violet-600 transition duration-300 ease-in-out cursor-pointer mt-3'>Sign out</p>
                                </div>
                            </form>
                            <div className='md:m-6'>
                            <button type="submit" className="bg-red-500 text-white py-2 w-full rounded-lg hover:bg-red-600 " >
                                <Link to="/create-listings" className='flex justify-center items-center'>
                                    <FcHome className='mr-2 text-3xl bg-slate-100 p-1 rounded-full border-2'/>
                                    <p className='text-lg'>Sell/Rent your House</p> </Link>
                            </button>
                            </div>
                            
                        </div>
                    </div>
                </div> 
            </section>
        </>
    );
}

export default Profile;
