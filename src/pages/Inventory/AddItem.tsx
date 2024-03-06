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
        className="absolute  z-10 top-20 left-1/3 bg-slate-100 pb-24 py-6 gap-2 px-10 flex flex-col font-manrope text-l font-semibold rounded-md "
      >
        <div className="flex flex-col gap-4 p-2 items-center justify-center ">
          <span className=" font-bold">New Items</span>

          <div className="flex flex-row gap-4 p-4 pr-8 items-start justify-center">
            <span className="font-bold">Supplier Name</span>
            <select value={selectedSupplier} onChange={handleSupplier}>
              {data?.map((supplier: any, index: any) => (
                <option key={index}>{supplier.supplier_name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-center items-center  w-full text-xl bg-slate-100">
            {" "}
            New Item
          </div>
          <form onSubmit={handleForm}>
            <div className="grid grid-cols-3">
              <input
                className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none"
                name="item_supplier_code"
                type="text"
                placeholder="ID Code"
              />

              <input
                className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none"
                name="item_name"
                type="text"
                placeholder="Item name"
              />
              <input
                className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none"
                name="item_description"
                type="text"
                placeholder="Item Description"
              />
              <select name="item_measurement_unit" required>
                <option value="KG">KG</option>
                <option value="G">G</option>
                <option value="BOXES">Boxes</option>
              </select>
              <select name="item_category" required>
                <option value="FRESH">FRESH</option>
                <option value="FROZEN">FROZEN</option>
                <option value="DRY">DRY</option>
              </select>
              <input
                className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none"
                name="item_quantity"
                type="number"
                placeholder="Quantiy"
              />
              <input
                className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none"
                name="item_price"
                type="number"
                placeholder="Price"
              />
            </div>
            <div className="absolute bottom-4 right-36 font-manrope text-l">
              <button className="bg-blue-600 hover:bg-blue-700 w-28 font-normal justify-center items-center p-3 text-white rounded-md">
                Reset
              </button>
            </div>
            <div className="absolute bottom-4 right-4  font-manrope text-l">
              {" "}
              <button className="bg-green-600 hover:bg-green-700 p-3 w-28 font-normal justify-center items-center text-white rounded-md">
                Add Item
              </button>
            </div>
          </form>
        </div>

        <div className="absolute top-2 right-2 ">
          <button onClick={handleClick}>
            <IoClose size={30} />
          </button>
        </div>
      </div>
    </>
  );
}

export default AddItem;
