import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { BsPinterest } from "react-icons/bs";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineDribbble,
  AiOutlineGoogle,
} from "react-icons/ai";

const MidFooter = () => {
  return (
    <div className="bg-gradient-to-r from-[#243b55] to-[#141E30]">
      <main className=" grid grid-cols-4 text-white py-12 max-w-6xl m-auto">
        <div className="w-full">
          <h3 className="font-bold mb-6">About Site</h3>
          <p className="w-3/4 text-sm text-gray-400">
            We’re reimagining how you buy, sell and rent. It’s now easier to get
            into a place you love. So let’s do this, together.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-6 text-lg">Quick Links</h3>
          <ul className="w-3/4 text-sm text-gray-400">
            <li className="mb-2 hover:text-white hover:translate-x-[10%] transition duration-500 ease-in-out">
              <a href="#">About Us</a>
            </li>
            <li className="mb-2 hover:text-white hover:translate-x-[10%] transition duration-500 ease-in-out">
              <a href="#">Terms & Conditions</a>
            </li>
            <li className="mb-2 hover:text-white hover:translate-x-[10%] transition duration-500 ease-in-out">
              <a href="#">Support Center</a>
            </li>
            <li className="mb-2 hover:text-white hover:translate-x-[10%] transition duration-500 ease-in-out">
              <a href="#">Press Info</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-6 text-lg">Contact Us</h3>
          <ul className="w-3/4 text-sm text-gray-400">
            <li className="mb-2 hover:text-white hover:translate-x-[10%] transition duration-500 ease-in-out">
              <a href="#">info@findhouse.com</a>
            </li>
            <li className="mb-2 hover:text-white hover:translate-x-[10%] transition duration-500 ease-in-out">
              <a href="#">Collins Street West, Victoria</a>
            </li>
            <li className="mb-2 hover:text-white hover:translate-x-[10%] transition duration-500 ease-in-out">
              <a href="#">8007, Australia.</a>
            </li>
            <li className="mb-2 hover:text-white hover:translate-x-[10%] transition duration-500 ease-in-out">
              <a href="#">+1 246-345-0699</a>
            </li>
            <li className="mb-2 hover:text-white hover:translate-x-[10%] transition duration-500 ease-in-out">
              <a href="#">+1 246-345-0695</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-6 text-lg">Follow us</h3>
          <div className="flex gap-3 text-gray-500 text-xl ">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <AiOutlineTwitter className="hover:text-white cursor-pointer" />
            <AiOutlineInstagram className="hover:text-white cursor-pointer" />
            <BsPinterest className="hover:text-white cursor-pointer" />
            <AiOutlineDribbble className="hover:text-white cursor-pointer" />
            <AiOutlineGoogle className="hover:text-white cursor-pointer" />
          </div>
          <h3 className="font-bold mb-4 text-lg mt-8">Subscribe</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Your email"
              className="bg-gray-700/75 px-6 py-3 rounded-full focus:outline-none"
            />
            <button className="bg-gray-700/75 p-4 rounded-full">
              <MdOutlineArrowForwardIos />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MidFooter;
