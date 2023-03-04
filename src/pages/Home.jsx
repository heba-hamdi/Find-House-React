import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Slider from "../components/Slider";
import { db } from "../firebase";
import ListingItem from "../components/ListingItem";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper";
import "swiper/css/bundle";
import FindCity from "../components/FindCity";
import ChooseUS from "../components/ChooseUs";
import Testimonials from "../components/Testimonials";
import ArticlesTips from "../components/ArticlesTips";
import Partners from "../components/Partners";
import TopFooter from "../components/footer/TopFooter";
import MidFooter from "../components/footer/MidFooter";
import BottomFooter from "../components/footer/BottomFooter";
import { CgScrollV } from "react-icons/cg";
import { BsArrowUpCircleFill } from "react-icons/bs";

const Home = () => {
  useEffect(() => {
    const scrollUpBtn = document.getElementById("scroll-up");
    window.onscroll = function () {
      scrollFunction();
    };
    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        scrollUpBtn.style.display = "block";
      } else {
        scrollUpBtn.style.display = "none";
      }
    }
  }, []);
  const handleClickScroll = () => {
    const element = document.getElementById("section-1");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  SwiperCore.use([Autoplay, Navigation, Pagination]);
  // offers
  const [offerListings, setOfferListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // end of offers

  // rents
  const [rentListings, setRentListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // end of rents

  // sales
  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // end of sales

  return (
    <div className="relative" id="section">
      {/* offers */}
      <div className="relative">
        <div
          className="absolute bottom-[12%] right-[4%] z-10 flex items-center gap-3"
          onClick={handleClickScroll}
        >
          <h5 className=" text-white text-lg">Scroll Down</h5>
          <div className=" text-white text-2xl border-2 rounded-full py-2 cursor-pointer">
            <CgScrollV />
          </div>
        </div>

        <Slider />
      </div>

      <div
        id="scroll-up"
        className="fixed bottom-[2%] right-[4%] z-10 visible"
        onClick={scrollUp}
      >
        <div className=" text-gray-400/50 bg-white text-3xl border-4 rounded-full cursor-pointer ">
          <BsArrowUpCircleFill />
        </div>
      </div>

      <div className="max-w-6xl m-auto my-20" id="section-1">
        {offerListings && offerListings.length > 0 && (
          <div className="xs:m-auto xs:w-3/4 lg:w-full lg:m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold text-center">
              Latest Offers
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Browse offers with great prices!
            </p>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              breakpoints={{
                // when window width is >= 640px
                640: {
                  slidesPerView: 2,
                },
                // when window width is >= 768px
                848: {
                  slidesPerView: 3,
                },
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {offerListings.map((listing, id) => {
                return (
                  <SwiperSlide key={id} className="relative">
                    <ListingItem
                      key={listing.id}
                      listing={listing.data}
                      listingId={listing.id}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Link to="/offers" onClick={scrollToTop}>
              <p className="px-3 text-sm text-red-500 hover:text-red-800 transition duration-150 ease-in-out text-center mt-4">
                Show more offers
              </p>
            </Link>
          </div>
        )}

        {/* end of offers */}

        {/* rents */}

        {rentListings && rentListings.length > 0 && (
          <div className="xs:m-auto xs:w-3/4 lg:w-full lg:m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold text-center">
              Latest For Rent
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Handpicked properties by our team.
            </p>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              breakpoints={{
                // when window width is >= 640px
                640: {
                  slidesPerView: 2,
                },
                // when window width is >= 768px
                848: {
                  slidesPerView: 3,
                },
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {rentListings.map((listing, id) => {
                return (
                  <SwiperSlide key={id}>
                    <ListingItem
                      key={listing.id}
                      listing={listing.data}
                      listingId={listing.id}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Link to="/category/rent" onClick={scrollToTop}>
              <p className="px-3 text-sm text-red-500 hover:text-red-800 transition duration-150 ease-in-out text-center mt-4">
                Show more rents
              </p>
            </Link>
          </div>
        )}

        {/* end of rents */}

        {/* sale */}

        {saleListings && saleListings.length > 0 && (
          <div className=" xs:m-auto xs:w-3/4 lg:w-full lg:m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold text-center">
              Latest For Sale
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Handpicked properties by our team.
            </p>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              breakpoints={{
                // when window width is >= 640px
                640: {
                  slidesPerView: 2,
                },
                // when window width is >= 768px
                848: {
                  slidesPerView: 3,
                },
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {saleListings.map((listing, id) => {
                return (
                  <SwiperSlide key={id}>
                    <ListingItem
                      key={listing.id}
                      listing={listing.data}
                      listingId={listing.id}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Link to="/category/sale" onClick={scrollToTop}>
              <p className="px-3 text-sm text-red-500 hover:text-red-800 transition duration-150 ease-in-out text-center mt-4">
                Show more sale
              </p>
            </Link>
          </div>
        )}

        {/* end of sale */}
        <FindCity />
        <ChooseUS />
      </div>
      <Testimonials
        background={"bg-gradient-to-r from-[#243b55] to-[#141E30]"}
        border={"border-gray-700"}
        textColor={"text-white"}
      />
      <ArticlesTips />
      <Partners />
      <TopFooter />
      <MidFooter />
      <BottomFooter />
    </div>
  );
};

export default Home;
