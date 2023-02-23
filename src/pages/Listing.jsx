import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import Loader from "../components/loader/Loader";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper";
import "swiper/css/bundle";
import { FaBed, FaBath, FaChair, FaParking } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import ContactLandlord from "../components/ContactLandlord";

const Listing = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [landlordForm, setLandlordForm] = useState(false);
  const auth = getAuth();
  const [showBtn, setShowBtn] = useState(true);
  SwiperCore.use([Navigation, Pagination, Autoplay]);

  useEffect(() => {
    const fetchDoc = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
        console.log(docSnap.data());
      }
    };
    fetchDoc();
  }, [params.listingId]);
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
          return (
            <SwiperSlide>
              <div
                className=" w-  background relative bg-cover"
                style={{
                  background: `url('${item}')`,
                  height: "600px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <section>
        <div className="pt-12 max-w-6xl m-auto">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-3xl mb-3">{listing.name}</h2>
              <p className="text-gray-500 text-sm">{listing.address}</p>
            </div>
            <div>
              <div className="flex items-center justify-center">
                <p className="font-bold text-3xl ">
                  $
                  {listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
                {listing.type === "rent" && (
                  <span className="text-lg">/mo</span>
                )}
              </div>
              {listing.offer && (
                <div className=" flex space-x-3 items-center mt-2">
                  <p className="bg-red-500 text-white p-2 rounded-lg">
                    For {listing.type}
                  </p>
                  <p className=" bg-[#006A70] text-white p-2 rounded-lg">
                    $
                    {(+listing.regularPrice - +listing.discountedPrice)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    discount
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white mt-12 rounded-md">
            <div className="m-6 ">
              <div className=" mr-12">
                <ul className="flex space-x-4 py-10">
                  <li className="bg-gray-100 py-2 px-4 rounded-md text-sm hover:text-red-500 cursor-pointer flex items-center">
                    <FaBed className="mr-2" />
                    {listing.bedrooms > 1
                      ? `${listing.bedrooms} Beds`
                      : `${listing.bedrooms} Bed`}
                  </li>
                  <li className="bg-gray-100 py-2 px-4 rounded-md text-sm hover:text-red-500 cursor-pointer flex items-center">
                    <FaBath className="mr-2" />
                    {listing.bathrooms > 1
                      ? `${listing.bathrooms} Baths`
                      : `${listing.bathrooms} Bath`}
                  </li>
                  <li className="bg-gray-100 py-2 px-4 rounded-md text-sm hover:text-red-500 cursor-pointer flex items-center">
                    <FaChair className="mr-2" />
                    {listing.furnished ? "Furnished" : "Not Furnished"}
                  </li>
                  <li className="bg-gray-100 py-2 px-4 rounded-md text-sm hover:text-red-500 cursor-pointer flex items-center">
                    <FaParking className="mr-2" />
                    {listing.parking ? "Parking" : "No Parking"}
                  </li>
                </ul>

                <h2 className="font-bold text-lg mb-3 text-gray-600">
                  Description
                </h2>
                <p className="text-gray-600">{listing.description}</p>

                {auth.currentUser?.uid !== listing.userRef && !landlordForm && (
                  <div>
                    <button
                      className="w-full font-bold border border-red-500 rounded-md p-3 text-white bg-red-500 mb-5 hover:bg-white hover:text-red-500 mt-3 transition duration-500"
                      onClick={() => setLandlordForm(true)}
                    >
                      Contact Landlord
                    </button>
                  </div>
                )}
                {landlordForm && (
                  <ContactLandlord
                    userRef={listing.userRef}
                    listing={listing}
                  />
                )}
              </div>

              <div>
                <div className="relative">
                  <iframe
                    width="1000"
                    height="400"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=12665 W Village Ln, Playa Vista, CA 90094&t=&z=10&ie=UTF8&iwloc=&output=embed"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    className="mt-10 rounded-md"
                  ></iframe>
                  {showBtn && (
                    <div className="absolute top-[40%] left-[30%] bg-gray-200/95 px-10 py-3 rounded-md transition-all duration-600 ease-in-out">
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Listing;
