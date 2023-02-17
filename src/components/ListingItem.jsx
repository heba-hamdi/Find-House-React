import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import { CiLocationOn } from 'react-icons/ci'
import { AiFillEdit } from 'react-icons/ai'
import { MdOutlineDeleteForever } from 'react-icons/md'

const ListingItem = ({ listingId, listing, onDelete, onEdit }) => {
  return (
    <li className='w-full bg-white rounded-md m-auto relative shadow-lg'>
      <div className='flex text-xl absolute bottom-5 right-5 gap-2'>
        {onEdit &&  <AiFillEdit className='cursor-pointer' onClick={()=>onEdit(listing.id)} />}       
        {onDelete && (<MdOutlineDeleteForever className='text-red-500 cursor-pointer' onClick={()=>onDelete(listing.id)}/>)}
      </div>
      <Link to="">
        <div>
          <div className='flex flex-col items-center relative pt-2 overflow-hidden'>
            <img src={listing.imgUrls} className="rounded-lg  md:w-[380px] h-[250px] w-full hover:scale-105 transition duration-300 ease-in-out object-cover" loading='lazy' />
            <Moment fromNow className='bg-red-500/80 text-white py-1 px-2 rounded-md absolute top-5 right-8'>{listing.timestamp.toDate()}</Moment>
          </div>
          <p className='font-bold text-2xl pl-4 pt-3'>{listing.name}</p>
          <div className='pl-4'>
            <div className='flex items-center gap-2 text-gray-600 text-sm'>
              <CiLocationOn />
              <p>{listing.address}</p>
            </div>

            <p className='font-semibold pl-1'>
              ${listing.offer ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {listing.type === "rent" && " / month"}
            </p>

            <div className='flex gap-3 pl-1 text-gray-600 text-sm pb-4'>
              <p>{listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}</p>
              <p>|</p>
              <p>{listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}</p>
            </div>

          </div>
        </div>
      </Link>

    </li>
  )
}

export default ListingItem
