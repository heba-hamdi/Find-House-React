import React, { useEffect, useState } from 'react'
import Select from "react-select";
import CheckInput from '../components/CheckInput';
import { useDropzone } from 'react-dropzone';
import { BsUpload } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import { toast } from 'react-toastify';
import { ref, getDownloadURL, uploadBytes,getStorage  } from "firebase/storage";
import {updateDoc, doc, arrayUnion, addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';

const CreateListing = () => {

  const Types = [
    { value: "Type 1", label: "Type 1" },
    { value: "Type 2", label: "Type 2" },
    { value: "Type 3", label: "Type 3" },
    { value: "Type 4", label: "Type 4" },
    { value: "Type 5", label: "Type 5" }
  ]

  const Status = [
    { value: "Status 1", label: "Status 1" },
    { value: "Status 2", label: "Status 2" },
    { value: "Status 3", label: "Status 3" },
    { value: "Status 4", label: "Status 4" },
    { value: "Status 5", label: "Status 5" },
  ]

  const Rooms = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: "other", label: "other" },
  ];
  const Bathrooms = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: "other", label: "other" },
  ];

  const Country = [
    { value: "Egypt", label: "Egypt" },
    { value: "Turkey", label: "Turkey" },
    { value: "USA", label: "USA" },
    { value: "England", label: "England" },
    { value: "Spain", label: "Spain" },
  ]

  const [checkBox1, setCheckBox1] = useState(['Air Conditioning', 'Lawn', 'Swimming Pool', 'Barbeque', 'Microwave']);
  const [checkBox2, setCheckBox2] = useState(['TV Cable', 'Dryer', 'Outdoor Shower', 'Washer', 'Gym'])
  const [checkBox3, setCheckBox3] = useState([
    'Refrigerator', 'WiFi', 'Laundry', 'Sauna', 'Window Coverings'
  ])


  const selectStyle = {
    control: (base, state) => ({
      ...base,
      minHeight: 32,
      boxShadow: "none",
      "&:focus-within": {
        borderColor: "#000",
        boxShadow: "0 0 0.2rem rgba(233, 105, 71, 0.25)",
        borderWidth: "2px"
      }

    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 12,
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      console.log({ data, isDisabled, isFocused, isSelected });
      return {
        ...styles,
        backgroundColor: isFocused ? "#EF4444" : null,
        color: isFocused ? "#fff" : "#000",

      };
    }
  };
  const auth=getAuth();
  const [loading, setLoading] = useState(false);
  const [geolocationEnabled, setGeolocationEnabled] = useState(true)
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    description: "",
    Bathrooms: 1,
    Rooms: 1,
    longitude: 0,
    latitude: 0,

  })
  const { type, name, description, longitude, latitude } = formData;


  const onChange = (e) => {
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files
      }))
    }

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value
      }))
    }

  }




  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 6,
    onDrop: (acceptedFiles, maxFiles) => {
      if (maxFiles.length > 6) {
        toast.error("Maximum 6 images")
      }
      setFiles(
        acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      )
    }
  })




  const images = files.map(file => (
    <img key={file.name} src={file.preview}
      alt="image" style={{ width: '200px', height: '200px' }} className="rounded-md mb-8" />
  ))
  console.log(images[0])

 

  const onSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true)
    const storage = getStorage();
   
    await Promise.all(
      files.map(image=>{
        const user=auth.currentUser.uid;
        const imageRef=ref(storage, `users/${user}/${image.path}`)
        uploadBytes(imageRef,image, "data_url").then(async ()=>{
          const downloadUrl=await getDownloadURL(imageRef)
          console.log(imageRef)
          console.log('hi')
          console.log(downloadUrl)
          await updateDoc(doc(db, 'users',user ), {
            images:arrayUnion(downloadUrl)
          }
        
          )
        })
      })
    )
   
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <section className='max-w-7xl m-auto px-6 lg:px-2 pt-5' >
          <div className='w-full flex flex-col items-start'>
            <h1 className='text-3xl font-semibold pt-6 '>Add New Property</h1>
            <p className='text-sm text-gray-500 mt-1 mb-6'>We are glad to see you again!</p>
          </div>

          <div className='bg-white rounded-md m-auto'>
            <h2 className='mx-6 pt-6 text-lg'>Create Listing</h2>
            <div className='mx-6 mt-4'>

              <div className='w-full mb-5'>
                <button type='button' id='sell' name='sell' className={`px-4 py-2 rounded-lg mr-3 ${type === "sell" ? "bg-red-500 text-white border border-white" : "bg-white text-red-500 border border-red-500"}`} onClick={onChange}>Sell</button>
                <button type='button' id='rent' name="rent" className={`px-4 py-2 rounded-lg mr-3 ${type === "rent" ? "bg-red-500 text-white border border-white" : "bg-white text-red-500 border border-red-500"}`} onClick={onChange} >Rent</button>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='name' className='font-semibold text-sm mb-2'>Property Title</label>
                <input type="text" id='name' value={name} onChange={onChange} className="border border-slate-200 rounded-md mb-4 p-3" />
                <label htmlFor='description' className='font-semibold text-sm mb-2 mt-3'>Description</label>
                <textarea id='description' value={description} onChange={onChange} className="border border-slate-200 rounded-md mb-4 p-3" rows="4" cols="50"></textarea>
                <div className='flex justify-between'>
                  <div className='flex flex-col w-full mr-3'>
                    <label htmlFor='types' className='font-semibold text-sm mb-2 mt-3'>Type</label>

                    <Select
                      defaultValue={Types[0]}
                      label="Single select"
                      options={Types}
                      styles={selectStyle}
                      classNames=
                      'focus:outline-red-500'
                      id='types'
                    />

                  </div>
                  <div className='flex flex-col w-full'>
                    <label htmlFor='status' className='font-semibold text-sm mb-2 mt-3'>Status</label>
                    <Select
                      defaultValue={Status[0]}
                      label="Single select"
                      options={Status}
                      styles={selectStyle}
                      id="status"
                      classNames={{
                        control: (state) =>
                          state.isFocused ? 'border-red-600' : 'border-grey-300',
                      }}
                    />
                  </div>
                </div>
                <div className='flex justify-between mt-5'>
                  <div className='flex flex-col w-full justify-center'>
                    <label htmlFor='name' className='font-semibold text-sm mb-2'>Price</label>

                    <div className='flex mr-3 items-center justify-center'>
                      <input type="number" step="any" id='price' onChange={onChange} className="border border-slate-200 rounded-md mb-4 p-3 mr-1 w-full" />
                      {type === 'rent' ?
                        <p className='font-bold mb-3'>$/month</p> : <p className='font-bold mb-3'>$</p>
                      }
                    </div>

                  </div>

                  <div className='flex flex-col w-full  mr-3'>
                    <label htmlFor='rooms' className='font-semibold text-sm mb-2'>Rooms</label>

                    <Select
                      defaultValue={Rooms[0]}
                      label="Single select"
                      options={Rooms}
                      styles={selectStyle}
                      padding-top={"20px"}
                      id="rooms"
                    />
                  </div>
                  <div className='flex flex-col w-full'>
                    <label htmlFor='bathrooms' className='font-semibold text-sm mb-2'>Bathrooms</label>

                    <Select
                      defaultValue={Bathrooms[0]}
                      label="Single select"
                      options={Bathrooms}
                      styles={selectStyle}
                      padding-top={"20px"}
                      id="bathrooms"
                    />
                  </div>
                </div>
              </div>


              <div className='w-full py-5 flex justify-between'>
                <button id='back' name='back' className="px-20 py-2 rounded-lg mr-3 bg-white text-red-500  border-2 border-red-500 shadow-outline hover:bg-red-500 shadow-lg hover:text-white transition duration-200 ease-out" >Back</button>
                <button id='next' name="nextrent" className="px-20 py-2 rounded-lg mr-3 bg-red-500 text-white  border-2 border-red-500 shadow-outline hover:bg-white shadow-lg hover:text-red-500 transition duration-200 ease-out">Next</button>
              </div>

            </div>
          </div>
        </section>


        <section className='max-w-7xl m-auto px-6 lg:px-2 pt-5 my-5' >
          <div className='bg-white rounded-md m-auto'>
            <h2 className='mx-6 mt-3 text-lg pt-6'>Location</h2>
            <div className='mx-6 mt-4'>


              <div className='flex flex-col'>
                <label htmlFor='address' className='font-semibold text-sm mb-2 mt-4'>Address</label>
                <input type="text" id='address' onChange={onChange} className="border border-slate-200 rounded-md mb-4 p-3" />

                <div className='flex justify-between mt-5 w-full'>
                  <div className='flex flex-col w-full'>
                    <label htmlFor='county' className='font-semibold text-sm mb-2'>County / State</label>
                    <input type="text" id='county' onChange={onChange} className="border border-slate-200 rounded-md mb-4 p-3 mr-3" />
                  </div>
                  <div className='flex flex-col w-full'>
                    <label htmlFor='city' className='font-semibold text-sm mb-2'>City</label>
                    <input type="text" id='city' onChange={onChange} className="border border-slate-200 rounded-md mb-4 p-3" />
                  </div>
                </div>
                <div className='flex justify-between mt-5 w-full'>
                  <div className='flex flex-col w-full'>
                    <label htmlFor='neighbourhood' className='font-semibold text-sm mb-2'>Neighborhood</label>
                    <input type="text" id='neighbourhood  ' onChange={onChange} className="border border-slate-200 rounded-md mb-4 p-3 mr-3" />
                  </div>
                  <div className='flex flex-col w-full'>
                    <label htmlFor='zip' className='font-semibold text-sm mb-2'>Zip</label>
                    <input type="text" id='zip' onChange={onChange} className="border border-slate-200 rounded-md mb-4 p-3 mr-3" />
                  </div>
                  <div className='flex flex-col w-full'>
                    <label htmlFor='name' className='font-semibold text-sm mb-2'>Country</label>
                    <Select
                      defaultValue={Country[0]}
                      label="Single select"
                      options={Country}
                      styles={selectStyle}
                    />
                  </div>
                </div>

                {!geolocationEnabled && (
                  <div className='flex justify-between gap-3'>
                    <div className='w-full'>
                      <p className='font-semibold text-sm mb-2'>Latitude (for Google Maps)</p>
                      <input type="number" id='latitude' value={latitude} min="-90" max="90" onChange={onChange} className=" w-full border border-slate-200 rounded-md mb-4 p-3 mr-3" />
                    </div>
                    <div className='w-full'>
                      <p className='font-semibold text-sm mb-2'>Longitude (for Google Maps)</p>
                      <input type="number" id='longitude' value={longitude} min="-180" max="180" onChange={onChange} className="w-full border border-slate-200 rounded-md mb-4 p-3 mr-3" />
                    </div>
                  </div>
                )}

                <div className='flex justify-between w-2/4'>
                  <div className='flex flex-col'>
                    <h2 className='my-3 text-lg pt-6'>Amenities</h2>
                    {checkBox1.map((item, index) => <CheckInput data={item} key={index} />)}
                  </div>
                  <div className='flex flex-col mt-12 pt-7'>
                    {checkBox2.map((item, index) => <CheckInput data={item} key={index} />)}
                  </div>
                  <div className='flex flex-col mt-12 pt-7'>
                    {checkBox3.map((item, index) => <CheckInput data={item} key={index} />)}
                  </div>
                </div>

                <div className='w-full py-6 flex justify-between'>
                  <button type='button' id='back' name='back' className="px-20 py-2 rounded-lg mr-3 bg-white text-red-500  border-2 border-red-500 shadow-outline hover:bg-red-500 shadow-lg hover:text-white transition duration-200 ease-out" >Back</button>
                  <button id='next' name="nextrent" className="px-20 py-2 rounded-lg mr-3 bg-red-500 text-white border-2 border-red-500 shadow-outline hover:bg-white shadow-lg hover:text-red-500 transition duration-200 ease-out">Next</button>
                </div>
              </div>

            </div>
          </div>
        </section>


        <section className='max-w-7xl m-auto px-6 lg:px-2 p-5 my-5' >
          <div className='bg-white rounded-md m-auto'>
            <h2 className='mx-6 mt-3 text-lg pt-6'>Property media</h2>
            <div className='p-6'>
              <div className='flex gap-4 w-full'>{images}</div>
              <div className="w-full bg-gray-100 flex flex-col items-center py-12 mb-6 rounded-md" {...getRootProps()}>
                <input type="file" {...getInputProps()} />
                <BsUpload className='mb-3 text-6xl text-red-500' />
                <p className="text-slate-700 font-bold text-xl">
                  Drag and drop images here
                  <p className='text-center text-sm text-slate-600 font-normal'>(max 6 images)</p>
                </p>
              </div>
              <div>
                <button type="submit" className="bg-black text-white py-2 w-full rounded-lg hover:border-2 hover:border-red-500 hover:bg-transparent hover:text-red-500 active:shadow-lg " >
                  <div to="" className='flex justify-center items-center'>
                    <p className='text-lg font-bold'>Create a Listing</p> </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  )
}

export default CreateListing
