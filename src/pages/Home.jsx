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

const Home = () => {
  const navigate = useNavigate();

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
    <div>
      {/* offers */}
      <Slider />

      <div className="max-w-6xl m-auto my-20">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold text-center">
              Latest Offers
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Browse offers with great prices!
            </p>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {offerListings.map((listing, id) => {
                return (
                  <SwiperSlide key={id}>
                    <ListingItem
                      key={listing.id}
                      listing={listing.data}
                      id={listing.id}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Link to="/offers">
              <p className="px-3 text-sm text-red-500 hover:text-red-800 transition duration-150 ease-in-out text-center mt-4">
                Show more offers
              </p>
            </Link>
          </div>
        )}
      </div>
      {/* end of offers */}

      {/* rents */}

      <div className="max-w-6xl m-auto my-20">
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold text-center">
              Latest For Rent
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Handpicked properties by our team.
            </p>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
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
                      id={listing.id}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-red-500 hover:text-red-800 transition duration-150 ease-in-out text-center mt-4">
                Show more rents
              </p>
            </Link>
          </div>
        )}
      </div>
      {/* end of rents */}

      {/* sale */}

      <div className="max-w-6xl m-auto my-20">
        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold text-center">
              Latest For Sale
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Handpicked properties by our team.
            </p>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
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
                      id={listing.id}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Link to="/category/sale">
              <p className="px-3 text-sm text-red-500 hover:text-red-800 transition duration-150 ease-in-out text-center mt-4">
                Show more sale
              </p>
            </Link>
          </div>
        )}
      </div>
      {/* end of sale */}
    </div>
  );
};

export default Home;
