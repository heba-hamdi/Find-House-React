import React from "react";

const BottomFooter = () => {
  return (
    <div className="bg-gray-900">
      <div className="max-w-6xl m-auto flex justify-between py-10 text-gray-400 text-sm">
        <ul className="flex gap-4">
          <li className="hover:text-white">
            <a href="/">Home</a>
          </li>
          <li className="hover:text-white">
            <a href="/offers">Offers</a>
          </li>
          <li className="hover:text-white">
            <a href="/category/rent">For Rent</a>
          </li>
          <li className="hover:text-white">
            <a href="/category/sale">For Sale</a>
          </li>
          <li className="hover:text-white">
            <a href="/about-us">About</a>
          </li>
          <li className="hover:text-white">
            <a href="#">Contact</a>
          </li>
        </ul>
        <div>
          <p>© 2020 Find House. Made with love by Heba Hamdi.</p>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;
