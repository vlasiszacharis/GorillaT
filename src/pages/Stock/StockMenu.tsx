import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoScanOutline } from "react-icons/io5";
import { MdInsertDriveFile, MdOutlineStoreMallDirectory } from "react-icons/md";
import { TbCoins } from "react-icons/tb";
import AddStockItem from "./AddStockItem";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

interface StockMenuPros {
  isActive: boolean;
  setIsActive: Function;
}
function StockMenu({ isActive, setIsActive }: StockMenuPros) {
  const [toggleItem, setToggleItem] = useState(false);
  const handleClick = () => {
    setToggleItem(!toggleItem);
  };
  return (
    <>
      {" "}
      <div className=" p-4 pr-12 gap-2 font-manrope text-l text-black text-opacity-70   font-semibold bg-slate-100">
        <div className="flex flex-row justify-end gap-8 ">
          <div className="flex justify-center items-center  p-3 py-7 gap-8 bg-white rounded-xl shadow-md min-w-72 max-h-40">
            <div className="flex flex-col justify-center items-center gap-4">
              <h4 className="font-semibold text-2xl">Stock</h4>
              <div className="flex flex-col gap-4 p-2 bg-slate-100 rounded-xl">
                <div className="flex flex-row justify-center gap-4 text-xl">
                  <span
                    className={`${
                      !isActive
                        ? "text-black opacity-70"
                        : " text-black font-bold"
                    }`}
                  >
                    Ingredients
                  </span>
                  <div
                    className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer ${
                      isActive ? "bg-custom-navy" : "bg-custom-navy"
                    }`}
                    onClick={() => setIsActive(!isActive)}
                  >
                    {/* Switch */}
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition duration-300 ease-in-out ${
                        !isActive ? "translate-x-7" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                  <span
                    className={`${
                      isActive
                        ? "text-black opacity-70"
                        : "text-black font-bold"
                    }`}
                  >
                    SubRecipes
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Stock Insights */}
          <div className="flex flex-row gap-4 pr-6">
            <div className="flex p-5 py-7  bg-white rounded-xl shadow-md min-w-52 max-h-40">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Total Stock Value</h4>
                <div className="flex flex-row items-center gap-3">
                  <div className=" w-10 bg-yellow-100 h-10 rounded flex justify-center items-center">
                    <TbCoins className="text-yellow-600 flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">67.254 $</div>
                </div>
              </div>
            </div>
            <div className="flex p-5 py-7 bg-white rounded-xl shadow-md min-w-48 max-h-40">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Positive Stock</h4>
                <div className="flex flex-row items-center gap-3">
                  <div className=" w-10 bg-green-100 h-10 rounded flex justify-center items-center">
                    <MdOutlineStoreMallDirectory className="text-green-600 flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">165</div>
                </div>
              </div>
            </div>
            <div className="flex p-5 py-7  bg-white rounded-xl shadow-md min-w-48 max-h-40">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Negative Stock</h4>
                <div className="flex flex-row items-center gap-3">
                  <div className=" w-10 bg-red-100 h-10 rounded flex justify-center items-center">
                    <MdOutlineStoreMallDirectory className="text-red-600 flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">25</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            {" "}
            <div>
              <Button
                message={"Insert"}
                bgColor={"bg-blue-600"}
                hoverBgColor={"hover:bg-custom-navy"}
                textColor={"white"}
                icon={<MdInsertDriveFile size={20} />}
              />{" "}
            </div>
            <div>
              <Button
                message={"Scan"}
                bgColor={"bg-blue-600"}
                hoverBgColor={"hover:bg-custom-navy"}
                textColor={"white"}
                icon={<IoScanOutline size={20} />}
              />
            </div>
            <div onClick={handleClick}>
              <Button
                message={"Add Item"}
                bgColor={"bg-blue-600"}
                hoverBgColor={"hover:bg-custom-navy"}
                textColor={"white"}
                icon={<FaPlus size={20} />}
              />
            </div>
          </div>
        </div>
      </div>
      {toggleItem && <AddStockItem setToggleItem={setToggleItem} />}
      {toggleItem && <Modal />}
    </>
  );
}

export default StockMenu;
