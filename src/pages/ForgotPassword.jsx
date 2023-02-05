import React, { useState } from 'react';
import { RiCloseCircleFill, RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from 'react-icons/ai'
import { TiSocialFacebook } from 'react-icons/ti'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { motion } from '../../node_modules/framer-motion/dist/framer-motion'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import FbAuth from '../components/FbAuth';
import GoogleAuth from '../components/GoogleAuth'


const ForgotPassword = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("")


    const handleInput = (e) => {
        setUserEmail(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
       try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, userEmail)
        toast.success("An Email is sent to your account")
        } catch (error) {
        toast.error("Couldn't send a reset password")
       }
    }

    return (
        // Page  Transition
        <motion.section
            className='fixed inset-0 bg-black bg-opacity-80 bg-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className='flex justify-center items-center w-full h-screen my-5 pr-14'>

                <div className='grid w-[400px] lg:grid-cols-2 lg:w-[800px] bg-white m-auto text-center font-semibold rounded-md relative'>
                    <div className='absolute top-[-2%] right-[-2%]'><RiCloseCircleFill className='  rounded-full text-3xl text-red-500 bg-white cursor-pointer' onClick={() => navigate("/")} /></div>
                    <div className='flex flex-col '>
                        <button className='py-6 bg-gray-100  mr-1' onClick={() => navigate("/sign-in")}>Login</button>
                        <div className='md:my-3 flex items-center h-full'>
                            <img src="https://images.unsplash.com/photo-1611175694989-4870fafa4494?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=674&q=80" className='w-11/12 m-auto rounded-3xl p-5 h-[300px] lg:h-full object-cover' alt="" />

                        </div>
                    </div>
                    <div>
                        <button className='py-6 w-full bg-gray-100 lg:inline-block hidden' onClick={() => navigate("/sign-up")}>Register</button>


                        {/* ==================================== Form ================================================== */}
                        <div className='h-full  flex items-start justify-center mt-3 mr-5'>
                            <form className='py-6 ml-3 w-full' onSubmit={onSubmit}>
                                <div className='flex flex-col'>
                                    <h2 className='text-left  text-xl'>Forgot Your password?</h2>
                                    <p className='text-xs text-gray-400 mt-1 mb-2'>Please enter your email address. You will receive a link to create a new password via email</p>
                                </div>
                                {/* =====================================Form Input===================================== */}
                                <div className='relative'>
                                    <input type="email" className='w-full font-normal border rounded-md  border-gray-200 " p-2 mb-5' placeholder="Email" id='email' value={userEmail} onChange={handleInput} />
                                    {userEmail ? "" : <AiOutlineMail className='absolute bottom-8 right-3 text-xl text-gray-400' />}

                                </div>

                                {/* =============Divider==================== */}
                                <div className='mb-4 before:border-t before:text-gray-300 flex before:flex-1 items-center after:border-t after:text-gray-300 flex after:flex-1'>
                                    <p className='mx-4 font-medium text-center text-sm'>Or</p>
                                </div>

                                {/* =================================Login================================================= */}

                               <FbAuth/>
                               <GoogleAuth/>



                                {/* ===============================Lower Content===================================== */}
                                <div className='flex justify-between mt-6'>
                                    <div>
                                        <input type="checkbox" name="" id="remember-me" />
                                        <label htmlFor="remember-me" className='font-thin text-sm ml-2'>Remember me</label>
                                    </div>
                                    <div className='font-thin text-sm text-violet-400 hover:text-violet-600 transition duration-300 ease-in-out'>
                                        <Link className=' text-violet-400 cursor-pointer hover:text-violet-600 transition duration-400 ease-in-out' to="/sign-in"> Login instead</Link>
                                    </div>
                                </div>

                                <div>
                                    <button className='w-full font-normal border border-red-500 rounded-md p-3 text-white bg-red-500 mb-5 hover:bg-white hover:text-red-500 mt-3 transition duration-500' type='submit'>
                                        <AiOutlineGoogle className='absolute bottom-9 left-3 text-xl  ' />
                                        <p className='font-bold'>Reset Password</p>
                                    </button>
                                </div>

                                <div className='font-thin text-sm mt-3'>
                                    <span>
                                        Don't have an account?
                                    </span>
                                    <Link className=' text-red-500 cursor-pointer hover:text-red-700 transition duration-400 ease-in-out' to="/sign-up"> Register</Link>
                                </div>
                            </form>



                        </div>
                    </div>
                </div>
            </div>


        </motion.section>
    );
}

export default ForgotPassword;

