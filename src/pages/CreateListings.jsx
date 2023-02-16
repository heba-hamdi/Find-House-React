import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader/Loader";

const CreateListings = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [geolocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    latitude: 0,
    longitude: 0,
    images: {},
  });
  const {
    type,
    name,
    bathrooms,
    bedrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData;
  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (+discountedPrice >= +regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }
    let geolocation = {};
    let location;
    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined;

      if (location === undefined) {
        setLoading(false);
        toast.error("please enter a correct address");
        return;
      }
    }
    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });
    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    console.log(formDataCopy);
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setLoading(false);
    toast.success("Listing created");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <main className="max-w-7xl m-auto px-6 lg:px-2 pt-5">
      <div className='w-full flex flex-col items-start'>
        <h1 className='text-3xl font-semibold pt-6 '>Add New Property</h1>
        <p className='text-sm text-gray-500 mt-1 mb-6'>We are glad to see you again!</p>
      </div>
      <div className='bg-white rounded-md m-auto mb-12'>
            <h2 className='mx-6 pt-6 text-lg font-semibold'>Create Listing</h2>
            <div className='mx-6 mt-4'>
    

      <form onSubmit={onSubmit}>
          <div className="flex w-full mb-5">
          <button
            type="button"
            id="type"
            value="sell"
            onClick={onChange}
            className={`w-1/4 px-4 py-2 rounded-lg mr-3 ${type === "sell" ? "bg-red-500 text-white border border-white" : "bg-white text-red-500 border border-red-500 w-1/4"}`}         >
            sell
          </button>
          <button
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
            className={`w-1/4 px-4 py-2 rounded-lg mr-3 ${type === "rent" ? "bg-red-500 text-white border border-white" : "bg-white text-red-500 border border-red-500 "}`}
          >
            rent
          </button>
        </div>
        <p className="text-lg mt-6 mb-2 font-semibold">Property Title</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          maxLength="32"
          minLength="10"
          required
          className="border border-slate-200 rounded-md mb-4 p-3 w-full"
        />
        <div className="w-full flex space-x-6 mb-6">
          <div className="w-1/4">
            <p className="text-lg font-semibold mb-2">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          <div className="w-1/4">
            <p className="text-lg font-semibold mb-2">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold mb-2">Parking spot</p>
        <div className="flex">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={` mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-1/4 ${!parking ? "bg-white text-black border border-gray-300" : "bg-black text-white"
              }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-1/4 ${parking ? "bg-white text-black border border-gray-300" : "bg-black text-white"
              }`}
          >
            no
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold mb-2">Furnished</p>
        <div className="flex">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-1/4 ${!furnished ? "bg-white text-black border border-gray-300" : "bg-black text-white"
              }`}
          >
            yes
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-1/4 ${furnished ? "bg-white text-black border border-gray-300" : "bg-black text-white"
              }`}
          >
            no
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold mb-2">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={onChange}
          placeholder="Address"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        {!geolocationEnabled && (
          <div className="flex space-x-6 justify-start mb-6 w-full">
            <div className="w-1/4">
              <p className="text-lg font-semibold mb-2">Latitude</p>
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={onChange}
                required
                step="0.0000"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
              />
            </div>
            <div className="w-1/4">
              <p className="text-lg font-semibold mb-2">Longitude</p>
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={onChange}
                required
                step="0.0000"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
              />
            </div>
          </div>
        )}
        <p className="text-lg font-semibold mb-2">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <p className="text-lg font-semibold mb-2">Offer</p>
        <div className="flex mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-1/4 ${!offer ?"bg-white text-black border border-gray-300" : "bg-black text-white"
              }`}
          >
            yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-1/4 ${offer? "bg-white text-black border border-gray-300" : "bg-black text-white"
              }`}
          >
            no
          </button>
        </div>
        <div className="flex items-center mb-6 w-full">
          <div className="w-full">
            <p className="text-lg font-semibold mb-2">Regular price</p>
            <div className="flex w-full items-center space-x-6">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                min="50"
                max="400000000"
                required
                className="w-1/4 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {offer && (
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold mb-2">Discounted price</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onChange}
                  min="50"
                  max="400000000"
                  required={offer}
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
                {type === "rent" && (
                  <div className="">
                    <p className="text-md w-full whitespace-nowrap">
                      $ / Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600 mb-2">
            The first image will be the cover (max 6)
          </p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="w-1/4 px-3 py-1.5 text-black bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-black focus:border-black p-4 custom-btn"
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-4 bg-red-500 text-white font-bold text-sm uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Create Listing
        </button>
        
      </form>
      </div>
      </div>
    </main>
  );
};

export default CreateListings;