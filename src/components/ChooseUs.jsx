import React from "react";
import ChooseCard from "./ChooseCard";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { BsHouseDoor } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
const ChooseUs = () => {
  return (
    <>
      <div className="mt-12">
        <h2 className="text-center font-bold text-2xl">Why Choose Us</h2>
        <p className="text-center mt-2 text-gray-500">
          We provide full service at every step.
        </p>
      </div>
      <div className="grid grid-cols-3 mt-12 cursor-pointer gap-6 ">
        <ChooseCard
          icon={<VscWorkspaceTrusted />}
          title={"Trusted By Thousands"}
        />
        <ChooseCard icon={<BsHouseDoor />} title={"Wide Renge Of Properties"} />
        <ChooseCard icon={<MdAttachMoney />} title={"Financing Made Easy"} />
      </div>
    </>
  );
};

export default ChooseUs;
