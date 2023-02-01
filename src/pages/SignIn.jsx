import React, { useState } from 'react';
import { RiCloseCircleFill, RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle } from 'react-icons/ai'
import { TiSocialFacebook } from 'react-icons/ti'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import {motion} from '../../node_modules/framer-motion/dist/framer-motion'
const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleInput = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }
    const { email, password } = formData;
    const [showPassword, setShowPassword] = useState(false);

    return (
        // Page  Transition
        <motion.section 
        className='fixed inset-0 bg-black bg-opacity-80 bg-blur-sm'
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        >
            <div className='flex justify-center items-center w-full h-screen my-5 pr-14'>

                <div className='grid w-[400px] lg:grid-cols-2 lg:w-[800px] bg-white m-auto text-center font-semibold rounded-md relative'>
                    <div className='absolute top-[-2%] right-[-2%]'><RiCloseCircleFill className='  rounded-full text-3xl text-red-500 bg-white cursor-pointer' onClick={()=>navigate("/")} /></div>
                    <div className='flex flex-col '>
                        <button className='pb-1 mt-4'>Login</button>
                        <div className='md:my-3 flex items-center h-full'>
                            <img src="https://images.unsplash.com/photo-1507208773393-40d9fc670acf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGNvbXB1dGVyfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60" className='w-11/12 m-auto rounded-3xl p-5 h-[300px] lg:h-full object-cover' alt="" />

                        </div>
                    </div>
                    <div>
                        <button className='py-6 w-full bg-gray-100 lg:inline-block hidden' onClick={() => navigate("/sign-up")}>Register</button>


                        {/* =================================== Form====================================================== */}
                        <div className='h-full  flex items-start justify-center mt-3 mr-5'>
                            <form className='py-6 ml-3 w-full'>
                                <h2 className='float-left mb-5 text-xl'>Login</h2>
                                <div className='relative'>
                                    <button className='w-full font-normal border border-blue-600 rounded-md p-3 text-blue-600 mb-5 hover:bg-blue-600 hover:text-white transition duration-500 ease-in-out' id='facebook'>
                                        <TiSocialFacebook className='absolute bottom-9 left-3 text-xl  ' />
                                        <p>Login with Facebook</p>
                                    </button>
                                </div>
                                <div className='relative'>
                                    <button className='w-full font-normal border border-red-500 rounded-md p-3 text-red-500 mb-5 hover:bg-red-500 hover:text-white transition duration-500 ease-in-out' id='facebook'>
                                        <AiOutlineGoogle className='absolute bottom-9 left-3 text-xl  ' />
                                        <p>Login with Google</p>
                                    </button>
                                </div>

                                <div className='mb-4 before:border-t before:text-gray-300 flex before:flex-1 items-center after:border-t after:text-gray-300 flex after:flex-1'>
                                    <p className='mx-4 font-medium text-center text-sm'>Or</p>
                                </div>

                                {/* =================================Form Inputs================================================= */}
                                <div className='relative'>
                                    <input type="email" className='w-full font-normal border rounded-md  border-gray-200 " p-2 mb-5' placeholder="Email" id='email' value={email} onChange={handleInput} />
                                    {email ? "" : <AiOutlineMail className='absolute bottom-8 right-3 text-xl text-gray-400' />}

                                </div>

                                <div className='relative'>
                                    <input type={showPassword ? "text" : "password"} className='w-full font-normal border rounded-md  border-gray-200 " p-2' placeholder='Password' id='password' value={password} onChange={handleInput} />
                                    {showPassword ? <AiOutlineEyeInvisible className='absolute bottom-3 right-3 text-xl text-gray-400 cursor-pointer' onClick={() => { setShowPassword(false) }} /> : <AiOutlineEye className='absolute bottom-3 right-3 text-xl text-gray-400 cursor-pointer' onClick={() => { setShowPassword(true) }} />}
                                </div>


                                {/* ===============================Lower Content===================================== */}
                                <div className='flex justify-between mt-6'>
                                    <div>
                                        <input type="checkbox" name="" id="remember-me" />
                                        <label htmlFor="remember-me" className='font-thin text-sm ml-2'>Remember me</label>
                                    </div>
                                    <div className='font-thin text-sm text-violet-400 hover:text-violet-600 transition duration-300 ease-in-out'><Link to="/forgot-password">Lost your password?</Link></div>
                                </div>
                                
                                <div>
                                    <button className='w-full font-normal border border-red-500 rounded-md p-3 text-white bg-red-500 mb-5 hover:bg-white hover:text-red-500 mt-3 transition duration-500' id='facebook' type='submit'>
                                        <AiOutlineGoogle className='absolute bottom-9 left-3 text-xl  ' />
                                        <p className='font-bold'>Login</p>
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

export default SignIn;
