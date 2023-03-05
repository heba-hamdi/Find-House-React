import React from "react";
import OffersComp from "../components/OffersComp";
import { useStateContext } from "../contexts/context";

const Offers = () => {
  const { showMenu } = useStateContext(false);
  return (
    <>
      {showMenu ? (
        <div className="xs:translate-x-[45%] lg:translate-x-0 transition duration-300 ease-in-out">
          <OffersComp />
        </div>
      ) : (
        <div className="translate-x-0 transition duration-300 ease-in-out">
          <OffersComp />
        </div>
      )}
    </>
  );
};

export default Offers;
