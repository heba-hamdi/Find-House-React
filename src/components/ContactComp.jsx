import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  AiOutlineDribbble,
  AiOutlineGoogle,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BsArrowUpCircleFill, BsPinterest } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import Loader from "../components/loader/Loader";
import { db } from "../firebase";
import TopFooter from "../components/footer/TopFooter";
import MidFooter from "../components/footer/MidFooter";
import BottomFooter from "../components/footer/BottomFooter";

const ContactComp = () => {
  const [listings, setlistings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBtn, setShowBtn] = useState(true);
  useEffect(() => {
    const scrollUpBtn = document.getElementById("scroll-up");
    window.onscroll = function () {
      scrollFunction();
    };
    function scrollFunction() {
      if (
        document.body.scrollTop > 5 ||
        document.documentElement.scrollTop > 5
      ) {
        scrollUpBtn.style.display = "block";
      } else {
        scrollUpBtn.style.display = "none";
      }
    }
  }, []);

  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("offer", "==", false),
          orderBy("timestamp", "desc")
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
        setlistings(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        id="scroll-up"
        className="fixed bottom-[2%] right-[4%] z-10 visible"
        onClick={scrollUp}
      >
        <div className=" text-gray-400/50 bg-white text-3xl border-4 rounded-full cursor-pointer ">
          <BsArrowUpCircleFill />
        </div>
      </div>
      <div className="relative w-screen background">
        <img
          src={listings[0].data.imgUrls[0]}
          className="h-[600px]  object-cover w-full"
        />
        <h1 className="font-bold text-white my-6 xs:text-4xl md:text-6xl lg:text-7xl absolute left-[50%] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%] bg-gray-500/75 py-2 px-6 rounded-md tracking-wider	">
          Contact Us
        </h1>
      </div>
      <main className="lg:max-w-6xl lg:m-auto my-20 flex xs:flex-col lg:flex-row gap-10 lg:justify-between items-center ">
        <div className="bg-white p-12 lg:w-8/12 xs:w-11/12 md:w-10/12 rounded-md border border-gray-200">
          <div className="flex gap-4">
            <div>
              <h2 className="font-bold text-lg">Send Us An Email</h2>
              <p className="my-6 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                gravida quis libero eleifend ornare. Maecenas mattis enim at
                arcu feugiat, sit amet blandit nisl iaculis. Donec lacus odio,
                malesuada eu libero sit amet, congue aliquam leo. In hac
                habitasse platea dictumst.
              </p>
              <div className="form">
                <div className="my-3 flex xs:flex-col lg:flex-row gap-3">
                  <input
                    type="text"
                    className="border rounded-md w-full p-3"
                    placeholder="Name"
                  />

                  <input
                    type="text"
                    className="border rounded-md w-full  p-3"
                    placeholder="Email"
                  />
                </div>
                <div className="my-3 flex gap-3 xs:flex-col md:flex-row">
                  <input
                    type="text"
                    className="border rounded-md w-full  p-3"
                    placeholder="Phone"
                  />

                  <input
                    type="text"
                    className="border rounded-md w-full p-3"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    placeholder="Your Message"
                    className="border rounded-md w-full p-3"
                  ></textarea>
                </div>
                <button className="bg-red-500 text-white rounded-md px-6 py-2 mt-6 hover:bg-red-600">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-12 lg:w-8/12 xs:w-11/12 md:w-10/12 rounded-md border border-gray-200">
          <h2 className="font-bold text-lg">Contact Us</h2>
          <p className="mt-1 text-sm text-gray-500 leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida
            quis libero eleifend ornare. habitasse platea dictumst.
          </p>
          <div>
            <h3 className="font-bold mt-6">Address</h3>
            <p className="mt-1 text-sm text-gray-500">
              2301 Ravenswood Rd Madison,
            </p>
            <p className="mt-1 text-sm text-gray-500">WI 53711</p>
          </div>
          <div>
            <h3 className="font-bold mt-4">Phone</h3>
            <p className="mt-1 text-sm text-gray-500">(315) 905-2321</p>
          </div>
          <div>
            <h3 className="font-bold mt-4">Mail</h3>
            <p className="mt-1 text-sm text-gray-500">info@findhouse.com</p>
          </div>
          <div>
            <h3 className="font-bold mt-4">Skype</h3>
            <p className="mt-1 text-sm text-gray-500">findhouse.com</p>
          </div>
          <div>
            <h3 className="font-bold mt-4 mb-4">Follow Us</h3>
            <div className="flex gap-3 text-gray-500">
              <div className="bg-gray-200 p-3 rounded-md ">
                <FaFacebookF className="hover:text-red-500 cursor-pointer " />
              </div>
              <div className="bg-gray-200 p-3 rounded-md ">
                <AiOutlineTwitter className="hover:text-red-500 cursor-pointer" />
              </div>
              <div className="bg-gray-200 p-3 rounded-md ">
                <AiOutlineInstagram className="hover:text-red-500 cursor-pointer" />
              </div>
              <div className="bg-gray-200 p-2 rounded-md ">
                <BsPinterest className="hover:text-red-500 cursor-pointer" />
              </div>
              <div className="bg-gray-200 p-3 rounded-md ">
                <AiOutlineDribbble className="hover:text-red-500 cursor-pointer" />
              </div>
              <div className="bg-gray-200 p-3 rounded-md ">
                <AiOutlineGoogle className="hover:text-red-500 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="relative">
        <div className="top-0 left-0 right-0 bottom-0 bg-black/50 absolute rounded-md"></div>
        <iframe
          height="400"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=12665 W Village Ln, Playa Vista, CA 90094&t=&z=10&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          className="mt-10 rounded-md w-full"
        ></iframe>
        {showBtn && (
          <>
            <div className="absolute top-0 left-[50%] -translate-x-[50%] bg-gray-200/95 px-10 py-3 rounded-md transition-all duration-600 ease-in-out">
              <h3 className="font-bold mb-3 text-gray-600">Google</h3>
              <p>This page can't load Google Maps correctly.</p>
              <div className="flex justify-between mt-5">
                <p className="text-sm text-gray-500 ">
                  Do you own this website ?
                </p>
                <button
                  className="text-blue-500 border border-gray-400 rounded-md px-4 py-1 shadow-md hover:shadow-xl "
                  onClick={() => setShowBtn(false)}
                >
                  Ok
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <TopFooter />
      <MidFooter />
      <BottomFooter />
    </>
  );
};

export default ContactComp;
