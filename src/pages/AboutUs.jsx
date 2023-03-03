import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import { db } from "../firebase";
import { AiOutlineUser, AiFillPlayCircle } from "react-icons/ai";
import { BsHouseDoor, BsHouseDoorFill } from "react-icons/bs";
import { RiExchangeDollarFill } from "react-icons/ri";
import ChooseCard from "../components/ChooseCard";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdAttachMoney } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import TopFooter from "../components/footer/TopFooter";
import Testimonials from "../components/Testimonials";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import Partners from "../components/Partners";

const AboutUs = () => {
  const [listings, setlistings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLine, setShowLine] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showLine3, setShowLine3] = useState(false);

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
  return (
    <div className="bg-white">
      <div className="relative w-screen background">
        <img
          src={listings[0].data.imgUrls[0]}
          className="h-[600px]  object-cover w-full"
        />
        <h1 className="font-bold text-white my-6 text-7xl absolute left-[50%] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%] bg-gray-500/75 py-2 px-6 rounded-md tracking-wider	">
          About Us
        </h1>
      </div>
      <main className="sm:mx-6 lg:max-w-6xl lg:mx-auto mt-12">
        <div className="m-2 mb-12">
          <h2 className="px-3 text-2xl mt-6 font-semibold text-center">
            Our Mission Is To FindHouse
          </h2>
        </div>
        <div>
          <section className="flex justify-between gap-10">
            <div>
              <p className="font-bold mb-3">
                Mauris ac consectetur ante, dapibus gravida tellus. Nullam
                aliquet eleifend dapibus. Cras sagittis, ex euismod lacinia
                tempor.
              </p>
              <p className="mb-3 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                quis ligula eu lectus vulputate porttitor sed feugiat nunc.
              </p>
              <p className="mb-3 text-sm">
                Mauris ac consectetur ante, dapibus gravida tellus. Nullam
                aliquet eleifend dapibus. Cras sagittis, ex euismod lacinia
                tempor, lectus orci elementum augue, eget auctor metus ante sit
                amet velit.
              </p>
              <p className="mb-3 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                quis ligula eu lectus vulputate porttitor sed feugiat nunc.
              </p>
              <p className="text-sm mb-3">
                Maecenas quis viverra metus, et efficitur ligula. Nam congue
                augue et ex congue, sed luctus lectus congue. Integer convallis
                condimentum sem. Duis elementum tortor eget condimentum tempor.
              </p>
              <p className="mb-3 text-sm">
                Mauris ac consectetur ante, dapibus gravida tellus. Nullam
                aliquet eleifend dapibus. Cras sagittis, ex euismod lacinia
                tempor, lectus orci elementum augue, eget auctor metus ante sit
                amet velit.
              </p>
              <p className="text-sm">
                Praesent sollicitudin lectus ut pharetra pulvinar. Donec et
                libero ligula. Vivamus semper at orci at placerat.Placeat Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Quod libero
                amet, laborum qui nulla quae alias tempora.
              </p>

              <div className="flex my-20 gap-3">
                <div className="flex items-center gap-3">
                  <AiOutlineUser className="text-6xl text-red-500" />
                  <div>
                    <h5 className="text-xl font-bold">80,123</h5>
                    <small>Customers to date</small>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BsHouseDoor className="text-6xl text-red-500" />
                  <div>
                    <h5 className="text-xl font-bold">$74 Billion</h5>
                    <small>In home sales</small>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RiExchangeDollarFill className="text-6xl text-red-500" />
                  <div>
                    <h5 className="text-xl font-bold">$468 Million</h5>
                    <small>In Savings</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mb-12 relative">
              <img
                src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt=""
                className=" h-[600px] w-full rounded-lg"
              />
              <a
                href="https://youtu.be/HRfL-yLieRA"
                target="_blank"
                className="absolute top-[50%] left-[50%] text-7xl -translate-x-[50%] -translate-y-[50%] cursor-pointer"
              >
                <span class="hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400/75 opacity-75"></span>

                <AiFillPlayCircle className="text-red-500 border-2 border-red-300/50 rounded-full " />
              </a>
            </div>
          </section>
        </div>
        <section className="mx-2 mb-12">
          <h2 className="px-3 text-2xl mt-6 font-semibold text-center">
            Why Choose Us
          </h2>
          <p className="text-center text-gray-500 mb-6">
            We provide full service at every step.
          </p>
        </section>
        <div className="grid grid-cols-3 my-12 cursor-pointer gap-6">
          <div
            className=" relative drop-shadow-none border border-gray-200/75 rounded-md hover:drop-shadow-xl"
            onMouseEnter={() => setShowLine(true)}
            onMouseLeave={() => setShowLine(false)}
          >
            {showLine ? (
              <>
                <ChooseCard
                  icon={<VscWorkspaceTrusted />}
                  title={"Trusted By Thousands"}
                  bgColor={"bg-gradient-to-r from-[#fd7e14] to-[#dc3545]"}
                  textColor={"text-white"}
                />

                <div className="absolute inset-x-0 bottom-0 h-2 bg-red-500"></div>
              </>
            ) : (
              <ChooseCard
                icon={<VscWorkspaceTrusted />}
                title={"Trusted By Thousands"}
                bgColor={"bg-red-200"}
                textColor={"text-red-500"}
              />
            )}
          </div>
          <div
            className=" relative drop-shadow-none border border-gray-200/75 rounded-md hover:drop-shadow-xl"
            onMouseEnter={() => setShowLine2(true)}
            onMouseLeave={() => setShowLine2(false)}
          >
            {showLine2 ? (
              <>
                <ChooseCard
                  icon={<BsHouseDoor />}
                  title={"Wide Renge Of Properties"}
                  bgColor={"bg-gradient-to-r from-[#fd7e14] to-[#dc3545]"}
                  textColor={"text-white"}
                />

                <div className="absolute inset-x-0 bottom-0 h-2 bg-red-500"></div>
              </>
            ) : (
              <ChooseCard
                icon={<BsHouseDoor />}
                title={"Wide Renge Of Properties"}
                bgColor={"bg-red-200"}
                textColor={"text-red-500"}
              />
            )}
          </div>
          <div
            className=" relative drop-shadow-none border border-gray-200/75 rounded-md hover:drop-shadow-xl"
            onMouseEnter={() => setShowLine3(true)}
            onMouseLeave={() => setShowLine3(false)}
          >
            {showLine3 ? (
              <>
                <ChooseCard
                  icon={<MdAttachMoney />}
                  title={"Financing Made Easy"}
                  bgColor={"bg-gradient-to-r from-[#fd7e14] to-[#dc3545]"}
                  textColor={"text-white"}
                />

                <div className="absolute inset-x-0 bottom-0 h-2 bg-red-500"></div>
              </>
            ) : (
              <ChooseCard
                icon={<MdAttachMoney />}
                title={"Financing Made Easy"}
                bgColor={"bg-red-200"}
                textColor={"text-red-500"}
              />
            )}
          </div>
        </div>
      </main>
      <section className="bg-gray-100">
        <div className="py-12 ">
          <h2 className="text-2xl mt-6 font-semibold text-center">Our Team</h2>
          <p className="text-center text-gray-500 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper max-w-6xl"
        >
          <SwiperSlide className="bg-white rounded-md">
            <div className="flex flex-col items-center text-center">
              <div className=" rounded-md bg-red-500 h-[250px] w-[250px] bg-cover bg-top bg-no-repeat bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')]"></div>
              <div className="my-4">
                <h3 className="text-lg">Helene Powers</h3>
                <small className="text-gray-400">Broker</small>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-white rounded-md">
            <div className="flex flex-col items-center text-center">
              <div className=" rounded-md bg-red-500 h-[250px] w-[250px] bg-cover bg-top bg-no-repeat bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')]"></div>
            </div>
            <div className="my-4">
              <h3 className="text-lg">Helene Powers</h3>
              <small className="text-gray-400">Broker</small>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-white rounded-md">
            <div className="flex flex-col items-center text-center">
              <div className=" rounded-md bg-red-500 h-[250px] w-[250px] bg-cover bg-top bg-no-repeat bg-[url('https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')]"></div>
            </div>
            <div className="my-4">
              <h3 className="text-lg">Helene Powers</h3>
              <small className="text-gray-400">Broker</small>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-white rounded-md">
            <div className="flex flex-col items-center text-center">
              <div className=" rounded-md bg-red-500 h-[250px] w-[250px] bg-cover bg-top bg-no-repeat bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')]"></div>
            </div>
            <div className="my-4">
              <h3 className="text-lg">Helene Powers</h3>
              <small className="text-gray-400">Broker</small>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-white rounded-md">
            <div className="flex flex-col items-center text-center">
              <div className=" rounded-md bg-red-500 h-[250px] w-[250px] bg-cover bg-top bg-no-repeat bg-[url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMHNtaWxpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')]"></div>
            </div>
            <div className="my-4">
              <h3 className="text-lg">Helene Powers</h3>
              <small className="text-gray-400">Broker</small>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-white rounded-md">
            <div className="flex flex-col items-center text-center">
              <div className=" rounded-md bg-red-500 h-[250px] w-[250px] bg-cover bg-top bg-no-repeat bg-[url('https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njl8fHByb2ZpbGUlMjBzbWlsaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60')]"></div>
            </div>
            <div className="my-4">
              <h3 className="text-lg">Helene Powers</h3>
              <small className="text-gray-400">Broker</small>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <Testimonials />
      <hr className="mt-12" />
      <Partners />
      <TopFooter />
    </div>
  );
};

export default AboutUs;
