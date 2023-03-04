import React from "react";
import ChooseCard from "./ChooseCard";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { BsHouseDoor } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
const ChooseUs = () => {
  return (
    <div className="">
      <div className="mt-12">
        <h2 className="text-center font-bold text-2xl">Why Choose Us</h2>
        <p className="text-center mt-2 text-gray-500">
          We provide full service at every step.
        </p>
      </div>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 cursor-pointer gap-6 xs:w-10/12 md:w-auto m-auto">
        <ChooseCard
          icon={<VscWorkspaceTrusted />}
          title={"Trusted By Thousands"}
          bgColor={"bg-red-200"}
          textColor={"text-red-500"}
          hoverBgColor={"hover:bg-red-500"}
          hoverText={"hover:text-white"}
        />
        <ChooseCard
          icon={<BsHouseDoor />}
          title={"Wide Renge Of Properties"}
          bgColor={"bg-red-200"}
          textColor={"text-red-500"}
          hoverBgColor={"hover:bg-red-500"}
          hoverText={"hover:text-white"}
        />
        <ChooseCard
          icon={<MdAttachMoney />}
          title={"Financing Made Easy"}
          bgColor={"bg-red-200"}
          textColor={"text-red-500"}
          hoverBgColor={"hover:bg-red-500"}
          hoverText={"hover:text-white"}
        />
      </div>
    </div>
  );
};

export default ChooseUs;
