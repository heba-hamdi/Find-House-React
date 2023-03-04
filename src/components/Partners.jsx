import React from "react";

const Partners = () => {
  return (
    <div className="bg-white py-1">
      <div className="max-w-6xl m-auto my-12">
        <div className="m-2 mb-6">
          <h2 className="px-3 text-2xl mt-6 font-semibold text-center">
            Our Partners
          </h2>
          <p className="text-center text-gray-500 mb-6">
            We only work with the best companies around the globe
          </p>
        </div>
        <div className=" grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 my-16 m-auto text-center">
          <div className="m-auto mb-6">
            <img
              src="https://creativelayers.net/themes/findhouse-html/images/partners/1.png"
              alt=""
            />
          </div>
          <div className="m-auto mb-6">
            <img
              src="https://creativelayers.net/themes/findhouse-html/images/partners/2.png"
              alt=""
            />
          </div>
          <div className="m-auto mb-6">
            <img
              src="https://creativelayers.net/themes/findhouse-html/images/partners/3.png"
              alt=""
            />
          </div>
          <div className="m-auto mb-6">
            <img
              src="https://creativelayers.net/themes/findhouse-html/images/partners/4.png"
              alt=""
            />
          </div>
          <div className="m-auto">
            <img
              src="https://creativelayers.net/themes/findhouse-html/images/partners/5.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
