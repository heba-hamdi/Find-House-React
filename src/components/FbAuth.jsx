import React from 'react'
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import { TiSocialFacebook } from 'react-icons/ti'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router';

const FbAuth = () => {
    const navigate=useNavigate();
    const onFbClick = async () => {
        try {
            const auth = getAuth();
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user)
            console.log("hello")

            const docRef=doc(db,"users", user.uid);
            const docSnap=await getDoc(docRef);
            if(!docSnap.exists()){
                await setDoc(docRef, {
                    name:user.displayName,
                    email:user.email,
                    timeStamp:serverTimestamp()
                })
            }
            toast.success("Login is successful")
            navigate("/");

        } catch (error) {
            toast.error("Couldn't authorize with Facebook")
            console.log(error);
        }
    }
    return (
        <>
            <div className='relative'>
                <button type="button" onClick={onFbClick} className='w-full font-normal border border-blue-600 rounded-md p-3 text-blue-600 mb-5 hover:bg-blue-600 hover:text-white transition duration-500 ease-in-out'>
                    <TiSocialFacebook className='absolute bottom-9 left-3 text-xl  ' />
                    <p>Login with Facebook</p>
                </button>
            </div>
        </>
    )
}

export default FbAuth
