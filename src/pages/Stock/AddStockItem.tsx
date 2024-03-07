import React, { ChangeEvent, FormEvent } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useState } from "react";
import { getSuppliers } from "../../utils/api/apiClient";
import { postStockItems } from "../../utils/api/apiClient";
import { AddStockItemProps } from "../../types/apiClientTypes";

function AddStockItem({ setToggleItem }: AddStockItemProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation(postStockItems, {
    onSuccess: () => {
      queryClient.invalidateQueries("StockItem");
    },
    onError: (error) => {
      console.error("Error creating supplier:", error);
    },
  });
  const { data, isLoading } = useQuery("Suppliers", getSuppliers);
  const [selectedSupplier, setSupplier] = useState("Global");
  if (isLoading) return <div>Loading...</div>;

  const handleSupplier = (event: ChangeEvent<HTMLSelectElement>) => {
    setSupplier(event.target.value);
  };

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const item_supplier_code = (
      form.elements.namedItem("item_supplier_code") as HTMLInputElement
    )?.value;
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

    const newStockItem = {
      item_supplier_name: selectedSupplier,
      item_supplier_code,
      item_name,
      item_measurement_unit,
      item_category,
      item_quantity,
    };
    mutation.mutate(newStockItem);
  };
  const handleClick = () => {
    setToggleItem(false);
  };
  return (
    <>
      <form onSubmit={handleForm}>
        {" "}
        <div
          id="add_supplier"
          className="absolute z-50 top-20 left-1/3 bg-slate-100 pb-8 py-8 gap-4 px-10 flex flex-col font-manrope text-l font-semibold rounded-md"
        >
          <div className="text-2xl font-bold text-center mb-8">
            Add Stock Item
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <span className="font-bold">Supplier Name</span>
              <select
                className="mt-1 border pl-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                value={selectedSupplier}
                onChange={handleSupplier}
              >
                {data?.map((supplier, index) => (
                  <option key={index} value={supplier.supplier_name}>
                    {supplier.supplier_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Supplier Code</span>
              <input
                name="item_supplier_code"
                className="mt-1 py-1 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                placeholder="Add Supplier Code"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <span className="font-bold">Item Name</span>
              <input
                name="item_name"
                className="mt-1 py-1 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                placeholder="Add Item Name"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Unit</span>
              <select
                name="item_measurement_unit"
                className="mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="KG">KG</option>
                <option value="G">G</option>
                <option value="BOXES">Boxes</option>
              </select>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Category</span>
              <select
                name="item_category"
                className="mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="FRESH">FRESH</option>
                <option value="FROZEN">FROZEN</option>
                <option value="DRY">DRY</option>
              </select>
            </div>
            <div className="flex flex-col col-span-2">
              <span className="font-bold">Quantity</span>
              <input
                name="item_quantity"
                className="mt-1 py-1 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                placeholder="Add Quantity"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 px-2">
            <button
              type="submit"
              className="bg-custom-navy hover:bg-blue-800 py-2 px-6 w-full justify-center items-center font-normal text-white rounded-md transition duration-150 ease-in-out"
            >
              Add
            </button>
          </div>
          <div className="absolute top-2 right-2">
            <button className="cursor-pointer" onClick={handleClick}>
              <IoClose size={30} />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddStockItem;
