import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { RiCloseCircleFill } from 'react-icons/ri'
import { AiOutlineMail, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineGoogle, AiOutlineUser } from 'react-icons/ai'
import { TiSocialFacebook } from 'react-icons/ti'
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db} from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';



const SignUp = () => {

    // **********************Variables*********************************
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const { name, email, password } = formData;
    const [showPassword, setShowPassword] = useState(false);
    

    // *************************Functions***************************
    const handleInput = (e) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }  
    
     const onSubmit = async(e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            updateProfile(auth.currentUser, {displayName:name})
            const formDataCopy={...formData}
            delete formDataCopy.password
            formDataCopy.timeStamp=serverTimestamp()
            await setDoc(doc(db, "users", user.uid), formDataCopy)
            navigate('/')

           } catch (error) {
            toast.error("something went wrong")
        }
    }

    return (
        <section className='fixed inset-0 bg-black bg-opacity-80 bg-blur-sm'>
            <div className='flex justify-center items-center w-full h-screen '>

                {/* =============================Left Side========================================= */}

                <div className='grid grid-cols-2 w-[800px] bg-white m-auto text-center font-semibold rounded-md relative'>
                    <div className='absolute top-[-2%] right-[-2%]'><RiCloseCircleFill className='  rounded-full text-3xl text-red-500 bg-white cursor-pointer' onClick={() => navigate("/")} /></div>
                    <div>
                        <button className='py-6 w-full bg-gray-100' onClick={() => navigate('/sign-in')}>Login</button>
                        <div className='my-3 flex items-center justify-center'>
                            <img src="https://images.unsplash.com/photo-1595074474890-f00d2a8ada52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" className='w-full rounded-3xl p-5' alt="" />
                        </div>
                    </div>


                    {/* ==========================================Right Side======================================================= */}
                    <div>
                        <button className='py-6 '>Register</button>
                        <div className='h-full  flex items-start justify-center mt-3 mr-3'>

                            {/* =============form start===================== */}

                            <form onSubmit={onSubmit} className='py-6 ml-3 w-full'>
                                <h2 className='float-left mb-5 text-xl'>Register</h2>
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


                                {/* ===============================================================Form Inputs=================================================== */}
                                <div className='mb-4 before:border-t before:text-gray-300 flex before:flex-1 items-center after:border-t after:text-gray-300 flex after:flex-1'>
                                    <p className='mx-4 font-medium text-center text-sm'>Or</p>
                                </div>

                                <div className='relative'>
                                    <input type="text" className='w-full font-normal border rounded-md  border-gray-200  p-2 mb-5' placeholder="User Name" id='name' value={name} onChange={handleInput} />
                                    {name ? "" : <AiOutlineUser className='absolute bottom-8 right-3 text-xl text-gray-400' />}
                                </div>

                                <div className='relative'>
                                    <input type="email" className='w-full font-normal border rounded-md  border-gray-200  p-2 mb-5' placeholder="Email" id='email' value={email} onChange={handleInput} />
                                    {email ? "" : <AiOutlineMail className='absolute bottom-8 right-3 text-xl text-gray-400' />}
                                </div>

                                <div className='relative'>
                                    <input type={showPassword ? "text" : "password"} className='w-full font-normal border rounded-md  border-gray-200  p-2 mb-5' placeholder='Password' id='password' value={password} onChange={handleInput} />
                                    {showPassword ? <AiOutlineEyeInvisible className='absolute bottom-8 right-3 text-xl text-gray-400 cursor-pointer' onClick={() => { setShowPassword(false) }} /> : <AiOutlineEye className='absolute bottom-8 right-3 text-xl text-gray-400 cursor-pointer' onClick={() => { setShowPassword(true) }} />}
                                </div>


                                {/* =================================Lower Content================================== */}
                                <div className='float-left'>
                                    <input type="checkbox" name="" id="remember-me" />
                                    <label htmlFor="remember-me" className='font-thin text-xs ml-2 text-gray-400 '>I have read and accept the Terms and Privacy Policy?</label>
                                </div>

                                <div>
                                    <button className='w-full font-normal border border-red-500 rounded-md p-3 text-white bg-red-500 mb-3 hover:bg-white hover:text-red-500 mt-3 transition duration-500' id='facebook' type='submit'>
                                        <AiOutlineGoogle className='absolute bottom-9 left-3 text-xl  ' />
                                        <p className='font-bold'>Sign Up</p>
                                    </button>
                                </div>

                                <div className='font-thin text-sm'>
                                    <span>
                                        Already have an account?
                                    </span>
                                    <Link className=' text-red-500 cursor-pointer hover:text-red-700 transition duration-400 ease-in-out' to="/sign-in"> Log in</Link>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    );
}

export default SignUp;
