import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlinePlus,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { useStateContext } from "../contexts/context";

const Header = () => {
  const [navLinkState, setNavLinkState] = useState("Login/Registeration");
  const [loggedUser, setLoggedUser] = useState(false);
  const { showMenu, setShowMenu } = useStateContext(true);

  let location = useLocation();

  const pathMatchRoute = (path) => {
    if (path === location.pathname) {
      return true;
    }
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setNavLinkState("Profile");
        setLoggedUser(true);
      } else {
        setNavLinkState("Login/Registeration");
        setLoggedUser(false);
      }
    });
  }, []);
  //  console.log(navLink);
  const menuBtnClicked = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <>
      <nav className="horizontal-navBar">
        <header className=" m-auto flex justify-between items-center bg-white border-b shadow-sm px-7">
          <a href="/">
            <div className="flex items-center py-3 cursor-pointer">
              <img
                src="https://creativelayers.net/themes/findhouse-html/images/header-logo2.png"
                alt=""
              />
              
            </div>
          </a>
          <ul className="invisible flex md:space-x-10 md:visible">
            <li
              className={`text-gray-500 py-5 border-b-[4px] border-b-transparent cursor-pointer hover:-translate-y-1 transition duration-300 ease-in-out ${
                pathMatchRoute("/") && "border-b-red-500"
              }`}
            >
              <a href="/">Home</a>
            </li>
            <li
              className={`text-gray-500 py-5 border-b-[4px] border-b-transparent cursor-pointer hover:-translate-y-1 transition duration-300 ease-in-out ${
                pathMatchRoute("/offers") && "border-b-red-500"
              }`}
            >
              <a href="/offers">Offers</a>
            </li>
            <li
              className={`text-gray-500 py-5 border-b-[4px] border-b-transparent cursor-pointer hover:-translate-y-1 transition duration-300 ease-in-out ${
                pathMatchRoute("/about-us") && "border-b-red-500"
              }`}
            >
              <a href="/about-us">About</a>
            </li>
            <li
              className={`text-gray-500 py-5 border-b-[4px] border-b-transparent cursor-pointer hover:-translate-y-1 transition duration-300 ease-in-out ${
                pathMatchRoute("/contact") && "border-b-red-500"
              }`}
            >
              <a href="/contact">Contact</a>
            </li>

            <li
              className={`text-gray-500 py-5 border-b-[4px] border-b-transparent cursor-pointer hover:-translate-y-1 transition duration-300 ease-in-out ${
                pathMatchRoute("/sign-in") ? "border-b-red-500" : ""
              } || ${pathMatchRoute("/sign-up") ? "border-b-red-500" : ""} || ${
                pathMatchRoute("/profile") ? "border-b-red-500" : ""
              } `}
            >
              <a
                href="/profile"
                className="flex items-center flex-nowrap border-l-2 pl-2"
              >
                <AiOutlineUser className="text-2xl" />
                {navLinkState}
              </a>
            </li>

            <button className="bg-red-500 text-white rounded-3xl px-3 m-3 hover:bg-red-600">
              <Link
                to={loggedUser ? "/create-listings" : "/sign-in"}
                className="flex justify-center items-center"
              >
                <AiOutlinePlus className="text-white mr-1" />{" "}
                <span className="mr-1">Create Listing</span>
              </Link>
            </button>
          </ul>
        </header>
      </nav>
      {/* =====================================Side Menu ================================ */}
      <nav className="side-navBar">
        <div>
          <header className=" m-auto flex justify-between items-center bg-white border-b shadow-sm px-7 ">
            <div>
              <CgMenuLeft
                className="text-3xl text-gray-500 cursor-pointer menuBtn "
                onClick={menuBtnClicked}
              />
            </div>
            <a href="/">
              {showMenu ? (
                <div className="flex items-center py-3 cursor-pointer translate-x-[45%] transition duration-300 ease-in-out">
                  <img
                    src="https://creativelayers.net/themes/findhouse-html/images/header-logo2.png"
                    alt=""
                  />

                  <h3 className="text-2xl mx-3">FindHouse</h3>
                </div>
              ) : (
                <div className="flex items-center py-3 cursor-pointer">
                  <img
                    src="https://creativelayers.net/themes/findhouse-html/images/header-logo2.png"
                    alt=""
                  />

                  <h3 className="text-2xl mx-3">FindHouse</h3>
                </div>
              )}
            </a>
            <ul className=" flex md:space-x-10 ">
              <li
                className={`text-gray-500 py-5 border-b-[4px] border-b-transparent cursor-pointer hover:-translate-y-1 transition duration-300 ease-in-out ${
                  pathMatchRoute("/profile") ? "border-b-red-500" : ""
                } `}
              >
                <a href="/profile">
                  <AiOutlineUser className="text-2xl mr-6 xs:invisible sm:visible" />
                </a>
              </li>
            </ul>
          </header>

          {showMenu && (
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

                <ul className="invisible flex flex-col items-center xs:visible text-lg text-center mt-3 ">
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

                  <button className="bg-red-500 text-white rounded-3xl px-2  mt-10 hover:bg-red-600  py-2">
                    <Link
                      to={loggedUser ? "/create-listings" : "/sign-in"}
                      className="flex justify-center items-center"
                    >
                      <AiOutlinePlus className="text-white mr-1" />
                      <span className="mr-1 ">Create Listing</span>
                    </Link>
                  </button>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
