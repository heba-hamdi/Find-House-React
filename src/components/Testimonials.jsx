import React from "react";
import { GiCeilingLight } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper";
import "swiper/css/bundle";

const Testimonials = ({ background, border, textColor }) => {
  return (
    <section className={` ${background} relative`}>
      <GiCeilingLight className="text-8xl text-red-500 absolute right-[10%]" />
      <div className="pt-12">
        <h2
          className={`text-center font-bold text-2xl ${textColor} tracking-wide`}
        >
          Testimonials
        </h2>
        <p className={`text-center mt-2 ${textColor}`}>
          Here could be a nice sub title
        </p>
      </div>
      <div>
        <Swiper
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          autoplay={{ delay: 3000 }}
          grabCursor={true}
        >
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center w-1/4 m-auto">
              <div className="mt-12">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                  className={`w-[100px] h-[100px] rounded-full border-8 object-cover ${border} `}
                />
              </div>
              <div className={`text-center ${textColor} mt-6`}>
                <h4 className="text-lg font-bold tracking-wide">Sarah Silva</h4>
                <p>Sales Manager</p>
                <p className="mt-6">
                  Aliquam dictum elit vitae mauris facilisis at dictum urna
                  dignissim donec vel lectus vel felis.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center w-1/4 m-auto">
              <div className="mt-12">
                <img
                  src="https://images.unsplash.com/photo-1609010697446-11f2155278f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                  className="w-[100px] h-[100px] rounded-full border-8 object-cover border-gray-700"
                />
              </div>
              <div className={`text-center ${textColor} mt-6`}>
                <h4 className="text-lg font-bold tracking-wide">
                  Edward Milga
                </h4>
                <p>Sales Manager</p>
                <p className="mt-6">
                  Aliquam dictum elit vitae mauris facilisis at dictum urna
                  dignissim donec vel lectus vel felis.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center w-1/4 m-auto">
              <div className="mt-12">
                <img
                  src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt=""
                  className="w-[100px] h-[100px] rounded-full border-8 object-cover border-gray-700"
                />
              </div>
              <div className={`text-center ${textColor} mt-6`}>
                <h4 className="text-lg font-bold tracking-wide">
                  Robin Cruize
                </h4>
                <p>Sales Manager</p>
                <p className="mt-6">
                  Aliquam dictum elit vitae mauris facilisis at dictum urna
                  dignissim donec vel lectus vel felis.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
