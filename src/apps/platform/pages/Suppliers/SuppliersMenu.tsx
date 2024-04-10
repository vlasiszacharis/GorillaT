import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { TbCoins } from "react-icons/tb";
import AddSupplier from "./AddSupplier";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

function SuppliersMenu() {
  const [toggleSupplier, setToggleSupplier] = useState(false);

  const handleAddSupplier = () => {
    setToggleSupplier(!toggleSupplier);
  };
  return (
    <>
      <div className=" p-2 py-2 xl:pr-16  gap-2 font-manrope text-l md:max-w-72 text-black text-opacity-70   font-semibold ">
        <div className="flex flex-row justify-between  gap-4 xl:pr-8">
          <div className="flex flex-row gap-4 p-2 ">
            {" "}
            <div className="flex md:p-2 lg:p-4 p-5 py-9  bg-white rounded-xl shadow-md xl:min-w-52 md:min-w-28 lg:min-w-40">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Total Suppliers</h4>
                <div className="flex flex-row items-center gap-3">
                  <div className=" md:w-6 lg:w-10 bg-yellow-100 md:h-6 lg:h-10 rounded flex justify-center items-center">
                    <TbCoins className="text-yellow-600 flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">20</div>
                </div>
              </div>
            </div>
            <div className="flex  md:p-2 lg:p-4 p-5 py-9 bg-white rounded-xl shadow-md xl:min-w-52 md:min-w-28 lg:min-w-40">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Total Products</h4>
                <div className="flex flex-row items-center gap-3">
                  <div className="md:w-6 w-10 md:h-6 bg-green-100 h-10 rounded flex justify-center items-center">
                    <MdOutlineStoreMallDirectory className="text-green-600 flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">1245</div>
                </div>
              </div>
            </div>
            <div className="flex md:p-2  lg:p-4 p-5 py-9  bg-white rounded-xl shadow-md xl:min-w-52 md:min-w-32  lg:min-w-40">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Orders</h4>
                <div className="flex flex-row items-center gap-3">
                  <div className=" md:w-6 w-10 md:h-6 bg-red-100 h-10 rounded flex justify-center items-center">
                    <MdOutlineStoreMallDirectory className="text-red-600 flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">25</div>
                </div>
              </div>
            </div>
          </div>
          <div className="  p-4 item-center justify-center gap-2 font-manrope text-l font-semibold ">
            <div className="flex flex-row gap-2 p-4 item-center justify-center">
              <div onClick={handleAddSupplier}>
                <Button
                  message={"Supplier"}
                  bgColor={"bg-blue-600"}
                  hoverBgColor={"hover:bg-custom-navy"}
                  textColor={"white"}
                  icon={<FaPlus size={20} />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {toggleSupplier && <AddSupplier setToggleSupplier={setToggleSupplier} />}
      {toggleSupplier && <Modal />}
    </>
  );
}

export default SuppliersMenu;
