import React from "react";
import ContactComp from "../components/ContactComp";
import { useStateContext } from "../contexts/context";

const Contact = () => {
  const { showMenu } = useStateContext(false);

  return (
    <>
      {showMenu ? (
        <div className="xs:translate-x-[45%] lg:translate-x-0 transition duration-300 ease-in-out">
          <ContactComp />
        </div>
      ) : (
        <div className="translate-x-0 transition duration-300 ease-in-out">
          <ContactComp />
        </div>
      )}
    </>
  );
};

export default Contact;
