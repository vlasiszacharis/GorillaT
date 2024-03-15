import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useMutation, useQueryClient } from "react-query";
import PopMessage from "../../components/PopMessage";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { postSuppliers } from "../../utils/api/apiClient";
interface AddSupplierProps {
  setToggleSupplier: Function;
}
function AddSupplier({ setToggleSupplier }: AddSupplierProps) {
  const [successMessage, setSuccessMessage] = useState(false);
  const handleClick = () => {
    setToggleSupplier(false);
  };

  const handlePopMessage = () => {
    setSuccessMessage(true);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(postSuppliers, {
    onSuccess: () => {
      queryClient.invalidateQueries("Suppliers");
      handlePopMessage();
      setTimeout(() => {
        setToggleSupplier(false);
      }, 1500);
    },
    onError: (error) => {
      console.error("Error creating supplier:", error);
    },
  });

  const handleSubmit = (values: any) => {
    const newSupplier = {
      supplier_afm: values.supplier_afm,
      supplier_name: values.supplier_name,
      supplier_email: values.supplier_email,
      supplier_webpage: values.supplier_webpage,
    };
    mutation.mutate(newSupplier);
  };
  const validationSchema = Yup.object({
    supplier_name: Yup.string().required("Supplier Name is required"),
    supplier_email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    supplier_afm: Yup.string().required("Tax Number is required"),
  });
  return (
    <>
      <div
        id="add_supplier"
        className="absolute z-50 mx-12 top-16 left-1/3 right-1/3  bg-white py-8 px-8 flex flex-col font-manrope text-l font-semibold rounded-md"
      >
        <div className="flex justify-start font-semibold items-center w-full text-2xl pb-4 bg-white mb-4">
          Add Supplier
        </div>
        <Formik
          initialValues={{
            supplier_name: "",
            supplier_email: "",
            supplier_afm: "",
            supplier_webpage: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            <div className="flex flex-col">
              <span className="font-bold pb-2">Supplier Name</span>
              <Field
                name="supplier_name"
                className="pl-2 py-1 w-full border border-gray-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                placeholder="Add Supplier Name"
              />
              <ErrorMessage
                name="supplier_name"
                component="div"
                className="text-red-600"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-bold pb-2">Email Address</span>
              <Field
                name="supplier_email"
                type="email"
                className="pl-2 py-1 w-full border border-gray-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                placeholder="Add Email Address"
              />
              <ErrorMessage
                name="supplier_email"
                component="div"
                className="text-red-600"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-bold pb-2">Tax Number</span>
              <Field
                name="supplier_afm"
                className="pl-2 py-1 w-full border border-gray-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                placeholder="Add Tax Number"
              />
              <ErrorMessage
                name="supplier_afm"
                component="div"
                className="text-red-600"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-bold pb-2">Webpage</span>
              <Field
                name="supplier_webpage"
                className="pl-2 py-1 w-full border border-gray-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
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
          </Form>
        </Formik>
        <div className="absolute top-8 right-3">
          <button className="cursor-pointer" onClick={handleClick}>
            <IoClose size={30} />
          </button>
        </div>
        {successMessage && (
          <PopMessage message={"Supplier has been created succesfully"} />
        )}
      </div>
    </>
  );
}

export default AddSupplier;
