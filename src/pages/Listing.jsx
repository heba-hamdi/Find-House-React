import { doc, getDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import Loader from '../components/loader/Loader'
import { db } from '../firebase'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import 'swiper/css/bundle';

const Listing = () => {
  const params = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  SwiperCore.use([Navigation, Pagination, Autoplay]);
 
  useEffect(() => {
    const fetchDoc = async () => {
      const docRef = doc(db, "listings", params.listingId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
        console.log(docSnap.data())
      }
    }
    fetchDoc();
  }, [params.listingId])
  if (loading) {
    return <Loader />;
  }
  console.log(listing.imgUrls);
  return (
    <main>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Autoplay, EffectFade]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        autoplay={3000}
        effect={"fade"}
       loop     
      >
        {listing.imgUrls.map((item, index) => {
          return <SwiperSlide>
            <div className='background relative' style={{
              background:`url('${item}')`,
              height:'600px',
              backgroundRepeat:'no-repeat',
              backgroundSize:'cover',
              backgroundPosition:'center' ,             
                 
            }}>
              
            </div>
          </SwiperSlide>;
        })}
      </Swiper>
    </main>
  )
}

export default Listing
