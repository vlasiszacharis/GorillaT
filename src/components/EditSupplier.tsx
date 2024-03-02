import React from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IoClose } from "react-icons/io5";
import { BASE_URL } from "../config/BaseUrl";
import { FormEvent, MouseEvent } from "react";
const editStockItem = async (editStockItem: any) => {
  const { data } = await axios.put(
    `${BASE_URL}/api/v1/stock/items/`,
    editStockItem
  );
  return data;
};

interface EditStockProps {
  setToggleEdit: (value: boolean) => void;
  supplierName: string;
  supplierCode: string;
}

function EditStockItem({
  setToggleEdit,
  supplierName,
  supplierCode,
}: EditStockProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation(editStockItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchStockItem");
    },
    onError: (error) => {
      console.error("Error editing supplier:", error);
    },
  });

  const handleEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const item_name = (form.elements.namedItem("item_name") as HTMLInputElement)
      ?.value;
    const item_measurement_unit = (
      form.elements.namedItem("item_measurement_unit") as HTMLInputElement
    )?.value;
    const item_category = (
      form.elements.namedItem("item_category") as HTMLInputElement
    )?.value;
    const item_quantity = (
      form.elements.namedItem("item_quantity") as HTMLInputElement
    )?.value;

    const editStockItem = {
      item_supplier_name: supplierName,
      item_supplier_code: supplierCode,
      item_name,
      item_measurement_unit,
      item_category,
      item_quantity: parseInt(item_quantity, 10),
    };

    mutation.mutate(editStockItem);
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setToggleEdit(false);
  };
  return (
    <>
      <div
        id="add_supplier"
        className="absolute  z-10 top-20 left-1/3 bg-slate-100 pb-24 py-8 gap-4 px-10 flex flex-col font-manrope text-l font-semibold rounded-md "
      >
        <form onSubmit={handleEdit}>
          <div className="flex flex-row gap-4 p-4 pr-2 items-start justify-center">
            <span className="font-bold">Supplier Name</span>
            <input
              name="item_supplier_code"
              value={supplierName}
              disabled
              className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none hover:border-gray-700"
              placeholder={supplierName}
            ></input>
          </div>

          <div className="flex flex-row gap-8 p-4 items-start justify-end ">
            <span className=" font-bold">Supplier Code</span>
            <input
              name="item_supplier_code"
              value={supplierCode}
              disabled
              className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none hover:border-gray-700"
              placeholder={supplierCode}
            ></input>
          </div>

          <div className="flex flex-row gap-8 p-4 items-start justify-end">
            <span className=" font-bold">Item Name</span>
            <input
              name="item_name"
              className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none hover:border-gray-700"
              placeholder="Add Item Name"
            ></input>
          </div>

          <div className="flex flex-row  gap-8 p-4 pr-24 items-start justify-center">
            <span className="pr-8 font-bold">Unit</span>
            <select name="item_measurement_unit" required>
              <option value="KG">KG</option>
              <option value="G">G</option>
              <option value="BOXES">Boxes</option>
            </select>
          </div>
          <div className="flex flex-row gap-8 p-4 pr-24  items-start justify-center">
            <span className=" font-bold">Category</span>
            <select name="item_category" required>
              <option value="FRESH">FRESH</option>
              <option value="FROZEN">FROZEN</option>
              <option value="DRY">DRY</option>
            </select>
          </div>
          <div className="flex flex-row gap-8 p-4 items-start justify-end">
            <span className=" font-bold">Quantity</span>
            <input
              name="item_quantity"
              className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none hover:border-gray-700"
              placeholder="Add Quantity"
            ></input>
          </div>

          <div className="absolute top-2 right-2 ">
            <button onClick={handleClick}>
              <IoClose size={30} />
            </button>
          </div>
          <div className="absolute bottom-4 right-36 font-manrope text-l">
            <button className="bg-blue-600 hover:bg-blue-700 w-28 font-normal justify-center items-center p-3 text-white rounded-md">
              Reset
            </button>
          </div>
          <div className="absolute bottom-4 right-4  font-manrope text-l">
            {" "}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 p-3 w-28 font-normal justify-center items-center text-white rounded-md"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditStockItem;
