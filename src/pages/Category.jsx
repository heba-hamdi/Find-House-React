import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Loader from "../components/loader/Loader";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router";
import MidFooter from "../components/footer/MidFooter";
import BottomFooter from "../components/footer/BottomFooter";

const Category = () => {
  const [listings, setlistings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(6)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const lastVisibleListing = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisibleListing);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setlistings(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, [params.categoryName]);

  if (loading) {
    return <Loader />;
  }
  // =================fetch more data=============================
  async function fetchMoreListings() {
    try {
      // get reference
      const listingsRef = collection(db, "listings");
      // create the query
      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        limit(3),
        startAfter(lastFetchedListing)
      );
      // execute the query
      const querySnap = await getDocs(q);
      const lastVisibleListing = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisibleListing);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setlistings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="relative w-screen background">
        <img
          src={listings[0].data.imgUrls[0]}
          className="h-[600px]  object-cover w-full"
        />
        <h1 className="font-bold text-white my-6 text-7xl absolute left-[50%] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%] bg-gray-500/75 py-2 px-6 rounded-md tracking-wider	">
          {params.categoryName === "rent"
            ? "Places for Rent"
            : "Places for Sale"}
        </h1>
      </div>
      <main className="sm:mx-6 lg:max-w-6xl lg:mx-auto mt-12">
        <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((item) => (
            <ListingItem
              key={item.id}
              listingId={item.id}
              listing={item.data}
            />
          ))}
        </ul>
      </main>
      {lastFetchedListing && (
        <div className="text-center my-6">
          <button
            className="bg-red-500 text-white px-3 m-3 hover:bg-red-600 py-2 px-4 rounded-md text-lg"
            onClick={fetchMoreListings}
          >
            Load more
          </button>
        </div>
      )}
      <MidFooter />
      <BottomFooter />
    </>
  );
};

export default Category;
