import React from "react";
import { useNavigate } from "react-router";

const TopFooter = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-red-500 text-white">
      <div className="flex justify-between items-center max-w-6xl m-auto py-12">
        <div>
          <h3 className="font-bold text-2xl">Become a Real Estate Agent</h3>
          <p>We only work with the best companies around the globe</p>
        </div>
        <div>
          <button
            className="bg-red-400/75 px-10 py-4 rounded-md hover:bg-white hover:text-red-500 transition duration-300 ease-in-out"
            onClick={() => navigate("/sign-up")}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopFooter;
