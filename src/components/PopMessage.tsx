import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { PopMessageProps } from "./types/componentsTypes";
const SuccessPopup = ({ message }: PopMessageProps) => {
  return (
    <div className="z-50 fixed top-3/4  p-3 border w-87 shadow-lg rounded-md bg-white">
      <div className="mt-3 text-center">
        <IoIosCheckmarkCircle className="mx-auto h-12 w-12 text-green-500" />
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Success!
        </h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-sm text-gray-500">{message} </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
