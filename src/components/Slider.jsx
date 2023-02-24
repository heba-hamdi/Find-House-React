import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper";
import "swiper/css/bundle";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "./loader/Loader";

const Slider = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchListing = async () => {
      const listings = [];
      const listingRef = collection(db, "listings");
      const querySnapshot = await getDocs(listingRef);

      querySnapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListing(listings);
      //   console.log(listing);
      if (listing) {
        setLoading(false);
        console.log("listing");
      }
    };
    fetchListing();
  }, []);
  if (loading) {
    return <Loader />;
  }
  if (listing.length === 0) {
    return <></>;
  }
  return (
    listing && (
      <>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Autoplay, EffectFade]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          autoplay={1000}
          effect={"Fade"}
          loop
        >
          {listing?.map((list) => {
            return (
              <SwiperSlide>
                <div
                  className="background relative bg-cover relative "
                  style={{
                    background: `url('${list.data.imgUrls[0]}')`,
                    height: "600px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
                    <div className="bg-gray-500/50 p-2 rounded-md">
                      <h1 className="text-[#fff] text-6xl ">
                        Find Your Dream House
                      </h1>
                      <p className="text-white text-center text-2xl mt-2 tracking-wider">
                        For best prices with limited time offer discounts.
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-[5%] left-[1%] z-10 bg-red-500 py-3 px-4 rounded-tr-lg rounded-bl-lg ">
                    <h3 className="text-white text-xl font-bold">
                      $
                      {list.data.discountPrice
                        ? list.data.discountPrice
                        : list.data.regularPrice}
                      {list.data.type === "rent" ? " / month" : ""}
                    </h3>
                  </div>
                  <div className="z-10 absolute top-[5%] left-[1%] bg-gray-100 py-3 px-4 rounded-tr-lg rounded-bl-lg cursor-pointer">
                    <h3 className=" text-xl font-bold">{list.data.name}</h3>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    )
  );
};

export default Slider;
