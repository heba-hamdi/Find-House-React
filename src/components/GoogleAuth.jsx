import React from 'react'
import { AiOutlineGoogle } from 'react-icons/ai'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from 'react-toastify';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router';

const OAuth = () => {
    const navigate=useNavigate();
    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);
            console.log("hi")

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
                toast.success("Login is successful")
                navigate("/");
                if (!user.email) {
                    user.email = user.providerData[0].email;
                  }
            }
        } catch (error) {
            toast.error("Couldn't authorize with Google")
            console.log(error);
        }
    }
    return (
        <>
            <div className='relative'>
                <button type='button' onClick={onGoogleClick} className='w-full font-normal border border-red-500 rounded-md p-3 text-red-500 mb-5 hover:bg-red-500 hover:text-white transition duration-500 ease-in-out' >
                    <AiOutlineGoogle className='absolute bottom-9 left-3 text-xl  ' />
                    <p>Login with Google</p>
                </button>
            </div>
        </>
    )
}

export default OAuth
