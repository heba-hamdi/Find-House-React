import React from "react";

const ChooseCard = ({ icon, title }) => {
  return (
    <section>
      <div className="flex flex-col items-center bg-white p-10 rounded-lg hover:shadow-md">
        <div className="bg-red-200 text-5xl text-red-500 hover:bg-red-500 hover:text-white rounded-full w-[130px] h-[130px] flex justify-center items-center transition duration-300 ease-in-out">
          {icon}
        </div>
        <h3 className="mt-10 font-bold text-lg">{title}</h3>
        <p className="mt-3 text-center text-gray-500">
          Aliquam dictum elit vitae mauris facilisis at dictum urna dignissim
          donec vel lectus vel felis."
        </p>
      </div>
    </section>
  );
};

export default ChooseCard;
