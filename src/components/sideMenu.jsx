import React from "react";

const sideMenu = () => {
  return (
    <>
      <div className="fixed z-10 w-[45%] top-0 bg-white transition duration-300 ease-in-out">
        <div className="sideMenu h-screen">
          <div className="relative ">
            <h2 className="font-bold text-2xl text-center mt-4 shadow-lg py-3">
              Menu
            </h2>
            <AiOutlineCloseCircle
              onClick={() => setShowMenu(false)}
              className="text-lg absolute top-0 right-2 cursor-pointer text-red-500 transition duration-300 ease-in-out"
            />
          </div>

          <ul className="invisible flex flex-col items-center xs:visible text-xl text-center mt-3 ">
            <li
              className={`w-full text-gray-500 py-3 border-gray border-b-[1px] cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out  `}
            >
              <a href="/">Home</a>
            </li>
            <li
              className={`w-full text-gray-500 py-3 border-gray border-b-[1px] cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out `}
            >
              <a href="/offers">Offers</a>
            </li>
            <li
              className={`w-full text-gray-500 py-3 border-gray border-b-[1px] cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out `}
            >
              <a href="/about-us">About</a>
            </li>
            <li
              className={`w-full text-gray-500 py-3 border-gray border-b-[1px] cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out `}
            >
              <a href="/contact">Contact</a>
            </li>
            <li
              className={`w-full text-gray-500 py-3 border-gray border-b-[1px] cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out `}
            >
              <a href="/sign-in">Login</a>
            </li>

            <li
              className={`w-full text-gray-500 border-gray border-b-[1px] py-3 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out `}
            >
              <a href="/sign-up">Register</a>
            </li>

            <button className="bg-red-500 text-white rounded-3xl px-20 mt-10 hover:bg-red-600  py-2">
              <Link
                to={loggedUser ? "/create-listings" : "/sign-in"}
                className="flex justify-center items-center"
              >
                <AiOutlinePlus className="text-white mr-1" />{" "}
                <span className="mr-1 ">Create Listing</span>
              </Link>
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default sideMenu;
