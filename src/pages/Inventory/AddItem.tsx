import React from "react";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FormEvent, ChangeEvent } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { postItem } from "../../utils/api/apiClient";
import { getSuppliers } from "../../utils/api/apiClient";
import { AddItemPros } from "../../types/apiClientTypes";

function AddItem({ setToggleItem }: AddItemPros) {
  const [selectedSupplier, setSupplier] = useState("Global");

  const handleSupplier = (event: ChangeEvent<HTMLSelectElement>) => {
    setSupplier(event.target.value);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(postItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchInventoryItem");
    },
    onError: (error) => {
      console.error("Error creating supplier:", error);
    },
  });

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const item_supplier_code = (
      form.elements.namedItem("item_supplier_code") as HTMLInputElement
    )?.value;
    const item_name = (form.elements.namedItem("item_name") as HTMLInputElement)
      ?.value;

    const item_description = (
      form.elements.namedItem("item_description") as HTMLInputElement
    )?.value;
    const item_measurement_unit = (
      form.elements.namedItem("item_measurement_unit") as HTMLInputElement
    )?.value;
    const item_category = (
      form.elements.namedItem("item_category") as HTMLInputElement
    )?.value;
    const item_quantity = (
      form.elements.namedItem("item_quantity") as HTMLInputElement
    )?.value;
    const item_price = (
      form.elements.namedItem("item_price") as HTMLInputElement
    )?.value;
    const newItem = {
      item_supplier_name: selectedSupplier,
      item_supplier_code,
      item_name,
      item_description,
      item_measurement_unit,
      item_category,
      item_quantity,
      item_price,
    };
    mutation.mutate(newItem);
  };
  const handleClick = () => {
    setToggleItem(false);
  };

  // Fetch Suppliers ->Supplier Name select
  const { data, isLoading } = useQuery("suppliers", getSuppliers);
  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <div
        id="add_supplier"
        className="absolute z-40 top-20 left-1/3 right-1/3 mx-4 bg-slate-100 pb-4 py-8 gap-4 px-10 flex flex-col font-manrope text-l font-semibold rounded-md"
      >
        <div className="flex flex-col gap-4 p-2 items-center justify-center">
          <div className="text-xl font-bold mb-4">Add Stock Item</div>
          <form onSubmit={handleForm} className="w-full">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-bold" htmlFor="supplier_name">
                  Supplier Name
                </label>
                <select
                  id="supplier_name"
                  className="pl-1 mt-1 py-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
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
                <label className="font-bold" htmlFor="id_code">
                  ID Code
                </label>
                <input
                  id="id_code"
                  className=" pl-1 py-1 mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  name="item_supplier_code"
                  type="text"
                  placeholder="ID Code"
                />
              </div>
              <div className="flex flex-col ">
                <label className="font-bold" htmlFor="item_name">
                  Item Name
                </label>
                <input
                  id="item_name"
                  className="pl-1 py-1 mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  name="item_name"
                  type="text"
                  placeholder="Item Name"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold" htmlFor="item_description">
                  Item Description
                </label>
                <input
                  id="item_description"
                  className="pl-1 py-1 mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  name="item_description"
                  type="text"
                  placeholder="Item Description"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold" htmlFor="unit">
                  Unit
                </label>
                <select
                  id="unit"
                  name="item_measurement_unit"
                  className="pl-1 py-1 mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="KG">KG</option>
                  <option value="G">G</option>
                  <option value="BOXES">Boxes</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-bold" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  name="item_category"
                  className="pl-1 py-1 mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="FRESH">FRESH</option>
                  <option value="FROZEN">FROZEN</option>
                  <option value="DRY">DRY</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-bold" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  id="quantity"
                  className="pl-1 py-1 mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  name="item_quantity"
                  type="number"
                  placeholder="Quantity"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold" htmlFor="price">
                  Price
                </label>
                <input
                  id="price"
                  className="pl-1 py-1 mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  name="item_price"
                  type="number"
                  placeholder="Price"
                />
              </div>
            </div>
            <div className="flex justify-end pt-8 pb-4 ">
              <button
                type="submit"
                className="pl-1  bg-blue-600 w-full  hover:bg-blue-700 py-2 px-6 justify-center items-center font-normal text-white rounded-md transition duration-150 ease-in-out"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
        <div className="absolute top-2 right-2">
          <button className="cursor-pointer" onClick={handleClick}>
            <IoClose size={30} />
          </button>
        </div>
      </div>
    </>
  );
}

export default AddItem;
