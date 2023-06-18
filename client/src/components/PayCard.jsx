import React from "react";
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";

const PayCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);

  return (
    <div
      className="w-full flex flex-row items-center relative rounded-[15px] bg-[#1c1c24] cursor-pointer shadow-lg shadow-indigo-500/50"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-[20%] h-[140px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px] ">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain shadow-lg shadow-blue-500/50"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            Education
          </p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>
      </div>
      {/* <div className="absolute right-5">
        <h2 className="text-[#8c6dfd] text-2xl">0.05 ETH</h2>
      </div> */}
    </div>
  );
};

export default PayCard;
