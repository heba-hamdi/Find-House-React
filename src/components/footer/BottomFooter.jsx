import React from "react";

const BottomFooter = () => {
  return (
    <div className="bg-gray-900">
      <div className="max-w-6xl m-auto flex justify-between py-10 text-gray-400 text-sm">
        <ul className="flex gap-4">
          <li className="hover:text-white">
            <a href="#">Home</a>
          </li>
          <li className="hover:text-white">
            <a href="#">Listing</a>
          </li>
          <li className="hover:text-white">
            <a href="#">Property</a>
          </li>
          <li className="hover:text-white">
            <a href="#">Pages</a>
          </li>
          <li className="hover:text-white">
            <a href="#">Blog</a>
          </li>
          <li className="hover:text-white">
            <a href="#">Contact</a>
          </li>
        </ul>
        <div>
          <p>© 2020 Find House. Made with love.</p>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;
