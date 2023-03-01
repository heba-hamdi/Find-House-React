import React from "react";

const TipsCard = ({ img, title, profilePic, profileName, date }) => {
  return (
    <div>
      <div className="bg-white rounded-md hover:drop-shadow-lg transition duration-300 ease-in-out">
        <div className="p-4">
          <img src={img} alt="" className="h-[250px] w-full rounded-md" />
        </div>
        <div className="px-4 pb-4">
          <small className="text-red-500">Business</small>
          <h3 className="font-bold w-3/4">{title}</h3>
        </div>
        <hr />
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={profilePic}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover mr-3"
            />
            <p>{profileName}</p>
          </div>

          <div>{date}</div>
        </div>
      </div>
    </div>
  );
};

export default TipsCard;
