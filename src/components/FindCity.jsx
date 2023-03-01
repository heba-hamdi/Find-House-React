import {
  collection,
  getCountFromServer,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const FindCity = () => {
  const [listings, setlistings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countCA, setCountCA] = useState(0);
  const [countIA, setCountIA] = useState(0);
  const [countFL, setCountFL] = useState(0);
  const [countNJ, setCountNJ] = useState(0);

  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const qCA = query(
          listingsRef,
          where("state", "in", ["CA"]),
          orderBy("timestamp", "desc")
        );
        const qIA = query(
          listingsRef,
          where("state", "in", ["IA"]),
          orderBy("timestamp", "desc")
        );
        const qFL = query(
          listingsRef,
          where("state", "in", ["FL"]),
          orderBy("timestamp", "desc")
        );
        const qNJ = query(
          listingsRef,
          where("state", "in", ["NJ"]),
          orderBy("timestamp", "desc")
        );
        // execute the query
        const querySnap = await getDocs(qIA);
        console.log(qCA);
        const snapshotCA = await getCountFromServer(qCA);
        const snapshotIA = await getCountFromServer(qIA);
        const snapshotFL = await getCountFromServer(qFL);
        const snapshotNJ = await getCountFromServer(qNJ);

        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setlistings(listings);
        setLoading(false);
        setCountCA(snapshotCA.data().count);
        setCountIA(snapshotIA.data().count);
        setCountFL(snapshotFL.data().count);
        setCountNJ(snapshotNJ.data().count);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  console.log(listings);
  console.log("lisndssxsgs");

  return (
    <>
      <div className="mt-12">
        <h2 className="text-center font-bold text-2xl">
          Find Properties in These Cities
        </h2>
        <p className="text-center mt-2 text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="mt-12 items-center  grid grid-cols-3 gap-4  ">
        <div className="rounded-md relative overflow-hidden col-span-2">
          <div className="background hover:scale-125 transition-all duration-700 ease-in-out cursor-pointer relative h-[330px] ">
            <img src="https://images.unsplash.com/photo-1610570858169-b60adec1c295?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" />
            <h6 className="absolute text-white text-2xl bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] z-10 font-bold">
              Iowa
            </h6>
            <p className="absolute text-white z-10 top-[55%] left-[50%] translate-x-[-50%]">
              {countIA && countIA > 1
                ? `${countIA} properties`
                : `${countIA} property`}
            </p>
          </div>
        </div>
        <div className="rounded-md relative overflow-hidden col-span-1 ">
          <div className="background hover:scale-125 transition-all duration-700 ease-in-out cursor-pointer ">
            <img
              src="https://images.unsplash.com/photo-1619083382085-9452906b7157?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1464&q=80"
              className="h-[330px]"
            />
            <h6 className="absolute text-white text-2xl bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] z-10 font-bold">
              California
            </h6>
            <p className="absolute text-white z-10 top-[55%] left-[50%] translate-x-[-50%]">
              {countCA && countCA > 1
                ? `${countCA} properties`
                : `${countCA} property`}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4 ">
        <div className="rounded-md relative overflow-hidden col-span-1">
          <div className=" background hover:scale-125 transition-all duration-700 ease-in-out cursor-pointer">
            <img
              src="
              https://images.unsplash.com/photo-1544665215-3871472514fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80
             "
              className="h-[330px]"
            />
            <h6 className="absolute text-white text-2xl bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] z-10 font-bold">
              Florida
            </h6>
            <p className="absolute text-white z-10 top-[55%] left-[50%] translate-x-[-50%]">
              {countFL && countFL > 1
                ? `${countFL} properties`
                : `${countFL} property`}
            </p>
          </div>
        </div>
        <div className="rounded-md relative overflow-hidden col-span-2">
          <div className="  background hover:scale-125 transition-all duration-700 ease-in-out cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              className="h-[330px] w-full"
            />
            <h6 className="absolute text-white text-2xl bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] z-10 font-bold">
              New Jersy
            </h6>
            <p className="absolute text-white z-10 top-[55%] left-[50%] translate-x-[-50%]">
              {countNJ && countNJ > 1
                ? `${countNJ} properties`
                : `${countNJ} property`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindCity;
