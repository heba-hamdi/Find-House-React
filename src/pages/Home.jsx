import React from "react";
import HomeComp from "../components/HomeComp";
import { useStateContext } from "../contexts/context";

const Home = () => {
  const { showMenu } = useStateContext(false);

  return (
    <>
      {showMenu ? (
        <div className="xs:translate-x-[45%] lg:translate-x-0 transition duration-300 ease-in-out">
          <HomeComp />
        </div>
      ) : (
        <div className="translate-x-0 transition duration-300 ease-in-out">
          <HomeComp />
        </div>
      )}
    </>
  );
};

export default Home;
