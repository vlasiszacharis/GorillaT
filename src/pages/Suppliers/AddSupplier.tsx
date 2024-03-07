import React from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { BASE_URL } from "../../utils/config/BaseUrl";
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
      queryClient.invalidateQueries("Suppliers");
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
        className="absolute z-50 mx-12 top-20 left-1/3 right-1/3 bg-slate-50 py-8 px-8 flex flex-col font-manrope text-l font-semibold rounded-md"
      >
        <div className="flex justify-center items-center w-full text-xl bg-slate-50 mb-4">
          Add Supplier
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <span className="font-bold">Supplier Name</span>
            <input
              name="supplier_name"
              className="pl-2 py-1 w-full border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
              placeholder="Add Supplier Name"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-bold">Email Address</span>
            <input
              name="supplier_email"
              className="pl-2 py-1 w-full border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
              placeholder="Add Email Address"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-bold">Tax Number</span>
            <input
              name="supplier_afm"
              className="pl-2 py-1 w-full border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
              placeholder="Add Tax Number"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-bold">Address</span>
            <input
              name="supplier_webpage"
              className="pl-2 py-1 w-full border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
              placeholder="Add Address"
            />
          </div>

          <div className="flex justify-end mt-4 px-2">
            <button
              type="submit"
              className="bg-custom-navy hover:bg-blue-800 py-2 px-6 w-full justify-center items-center font-normal text-white rounded-md transition duration-150 ease-in-out"
            >
              Add
            </button>
          </div>
        </form>
        <div className="absolute top-2 right-2">
          <button className="cursor-pointer" onClick={handleClick}>
            <IoClose size={30} />
          </button>
        </div>
      </div>
    </>
  );
}

export default AddSupplier;
