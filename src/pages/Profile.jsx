import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { FcHome } from 'react-icons/fc'
import ListingItem from '../components/ListingItem';

const Profile = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const { name, email } = formData;

    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

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

    useEffect(() => {
        async function fetchUserListings() {
            const listingRef = collection(db, "listings");
            const q = query(
                listingRef,
                where("userRef", "==", auth.currentUser.uid),
                orderBy("timestamp", "desc")
            );
            const querySnap = await getDocs(q);
            let listings = [];
            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setListings(listings);
            setLoading(false);
        }
        fetchUserListings();
    }, []);

    const onDelete= async (listingId)=>{
        if(window.confirm("Are you sure you want to delete this listing?")){
            await deleteDoc(doc(db, 'listings', listingId))
        }
        const updatedListing= listings.filter(listing=>
             listing.id !== listingId
        )

        setListings(updatedListing)
        toast.success("Listing deleted")
    }
    const onEdit= (listingId)=>{
        navigate(`/edit-listing/${listingId}`)
    }

    return (
        <>
            <section className='max-w-7xl mt-6 p-4 mb-6 md:py-4 md:mx-auto '>
                <h1 className='text-3xl font-semibold pt-6'>My Profile</h1>
                <p className='text-sm text-gray-500 mt-1 mb-6'>We are glad to see you again!</p>
                <div className='w-full flex justify-center'>
                    <div className='bg-white w-full'>
                        <h2 className='mx-6 my-3 md:pt-6 font-semibold'>Profile information</h2>
                        <div className='m-6 flex flex-col items-center'>
                            <form className='md:mb-6 md:pb-6 w-full'>
                                <input type="text" className={!changeDetails ? 'w-full border border-slate-300 p-2 rounded-md mb-3' : 'w-full border border-slate-300 p-2 rounded-md mb-3 bg-red-200'} disabled={!changeDetails} id='name' value={name} onChange={onChange} />
                                <input type="email" className='w-full border border-slate-300 p-2 rounded-md' disabled id='email' value={email} />
                                <div className='flex flex-col md:flex-row md:justify-between'>
                                    <p className='text-xs md:text-sm mt-3 text-gray-400'>Do you want to change your username?
                                        <span className='ml-1 font-semibold text-red-400 hover:text-red-600 cursor-pointer' onClick={changeandsubmit}>
                                            {!changeDetails ? "Edit" : "Apply Changes"}</span>
                                    </p>
                                    <p onClick={logout} className='font-semibold text-sm  text-violet-400 hover:text-violet-600 transition duration-300 ease-in-out cursor-pointer mt-3'>Sign out</p>
                                </div>
                            </form>
                            <div className='md:m-6 w-full'>
                                <button type="submit" className="bg-red-500 text-white py-2 w-full rounded-lg hover:bg-red-600 " >
                                    <Link to="/create-listings" className='flex justify-center items-center'>
                                        <FcHome className='mr-2 text-3xl bg-slate-100 p-1 rounded-full border-2' />
                                        <p className='text-lg'>Sell/Rent your House</p> </Link>
                                </button>
                            </div>
                          
                        </div>

                    </div>

                </div>

            </section>
            <section className='max-w-7xl mt-6 p-4 mb-6 md:py-4 md:mx-auto '>
              
                <div className='w-full'>                  
                        <h2 className='mx-6 my-3 md:pt-6 font-semibold'>My Listings</h2>
                        <div className='w-full '>
                                {!loading && listings.length > 0 && (
                                    <>                                    
                                        <ul className='mt-6 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-3 w-3/4 md:w-full'>
                                            {listings.map(listing=>(
                                                <ListingItem listingId={listing.id} listing={listing.data} key={listing.id} onDelete={()=>onDelete(listing.id)} onEdit={()=>onEdit(listing.id)} />
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        </section>

        </>
    );
}

export default Profile;
