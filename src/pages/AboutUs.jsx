import React from "react";
import AboutComp from "../components/AboutComp";
import { useStateContext } from "../contexts/context";

const AboutUs = () => {
  const { showMenu } = useStateContext(false);

  return (
    <>
      {showMenu ? (
        <div className="xs:translate-x-[45%] lg:translate-x-0 transition duration-300 ease-in-out">
          <AboutComp />
        </div>
      ) : (
        <div className="translate-x-0 transition duration-300 ease-in-out">
          <AboutComp />
        </div>
      )}
    </>
  );
};

export default AboutUs;
