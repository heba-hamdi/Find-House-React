import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper";
import "swiper/css/bundle";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "./loader/Loader";
import { useNavigate } from "react-router";

const Slider = ({ nav }) => {
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing(listings);
      setLoading(false);
    }
    fetchListings();
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
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {listing?.map((list, id) => {
            return (
              <SwiperSlide
                key={id}
                onClick={() =>
                  navigate(`/category/${list.data.type}/${list.id}`)
                }
                className="relative"
              >
                {/* Scroll Down Button */}

                <div
                  className="background relative bg-cover cursor-pointer "
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
                      <h1 className="text-[#fff] xs:text-3xl md:text-4xl lg:text-6xl ">
                        Find Your Dream House
                      </h1>
                      <p className="text-white lg:text-center xs:text-sm sm:text-lg md:text-xl lg:text-2xl mt-2 tracking-wider">
                        For best prices with limited time offer discounts.
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-[5%] left-[1%] z-10 bg-red-500 py-3 px-4 rounded-tr-lg rounded-bl-lg ">
                    <h3 className="text-white lg:text-xl font-bold">
                      $
                      {list.data.discountPrice
                        ? list.data.discountPrice
                        : list.data.regularPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      {list.data.type === "rent" ? " / month" : ""}
                    </h3>
                  </div>
                  <div className="z-10 absolute top-[5%] left-[1%] bg-gray-100 py-3 px-4 rounded-tr-lg rounded-bl-lg cursor-pointer">
                    <h3 className=" lg:text-xl font-bold">{list.data.name}</h3>
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
