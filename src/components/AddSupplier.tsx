import React from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../config/BaseUrl";
import { FormEvent } from "react";
interface AddSupplierProps {
  setToggleSupplier: (value: boolean) => void;
}
function AddSupplier({ setToggleSupplier }: AddSupplierProps) {
  const handleClick = () => {
    setToggleSupplier(false);
  };

  const postSuppliers = async (newSupplier: any) => {
    const { data } = await axios.post(
      `${BASE_URL}/api/v1/suppliers`,
      newSupplier
    );
    return data;
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(postSuppliers, {
    onSuccess: () => {
      queryClient.invalidateQueries("dataKey");
      setToggleSupplier(false);
    },
    onError: (error) => {
      console.error("Error creating supplier:", error);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const supplier_afm = (
      form.elements.namedItem("supplier_afm") as HTMLInputElement
    )?.value;
    const supplier_name = (
      form.elements.namedItem("supplier_name") as HTMLInputElement
    )?.value;
    const supplier_email = (
      form.elements.namedItem("supplier_email") as HTMLInputElement
    )?.value;
    const supplier_webpage = (
      form.elements.namedItem("supplier_webpage") as HTMLInputElement
    )?.value;
    const newSupplier = {
      supplier_afm,
      supplier_name,
      supplier_email,
      supplier_webpage,
    };
    mutation.mutate(newSupplier);
  };

  return (
    <>
      <div
        id="add_supplier"
        className="absolute  z-10 top-20 left-1/3 bg-slate-100 pb-24 py-8 gap-4 px-10 flex flex-col font-manrope text-l font-semibold rounded-md "
      >
        <div className="flex flex-center items-center  w-full text-xl bg-slate-100">
          {" "}
          Add Supplier
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-8 p-4 items-start justify-end">
            <span className="font-bold">Supplier Name</span>
            <input
              name="supplier_name"
              className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none hover:border-gray-700"
              placeholder="Add Supplier Name"
            ></input>
          </div>

          <div className="flex flex-row gap-8 p-4 items-start justify-end ">
            <span className=" font-bold">Email Address</span>
            <input
              name="supplier_email"
              className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none hover:border-gray-700"
              placeholder="Add Email Address"
            ></input>
          </div>

          <div className="flex flex-row gap-8 p-4 items-start justify-end">
            <span className=" font-bold">Tax Number</span>
            <input
              name="supplier_afm"
              className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none hover:border-gray-700"
              placeholder="Add Tax Number"
            ></input>
          </div>

          <div className="flex flex-row gap-8 p-4 items-start justify-end">
            <span className=" font-bold">Address</span>
            <input
              name="supplier_webpage"
              className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none hover:border-gray-700"
              placeholder="Add Address"
            ></input>
          </div>

          <div className="absolute top-2 right-2 ">
            <button className="cursor-pointer" onClick={handleClick}>
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
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddSupplier;
