import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { editSupplier } from "../../utils/api/apiClient";
import PopMessage from "../../components/PopMessage";

interface EditSupplierProps {
  setToggleEdit: Function;
  supplier_name: string;
  supplier_email: string;
  supplier_afm: string;
  supplier_webpage: string;
}

function EditSupplier({
  setToggleEdit,
  supplier_email,
  supplier_afm,
  supplier_name,
  supplier_webpage,
}: EditSupplierProps) {
  const handleClick = () => {
    setToggleEdit(false);
  };
  const [successMessage, setSuccessMessage] = useState(false);
  const handlePopMessage = () => {
    setSuccessMessage(true);
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(editSupplier, {
    onSuccess: () => {
      queryClient.invalidateQueries("Suppliers");
      handlePopMessage();
      setTimeout(() => {
        setToggleEdit(false);
      }, 1500);
    },
    onError: (error) => {
      console.error("Error editing supplier:", error);
    },
  });

  const handleSubmit = (values: any) => {
    const editSupplier = {
      supplier_afm: values.supplier_afm,
      supplier_name: values.supplier_name,
      supplier_email: values.supplier_email,
      supplier_webpage: values.supplier_webpage,
    };
    mutation.mutate(editSupplier);
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
        id="edit_supplier"
        className="absolute z-50 mx-12 top-16 left-1/3 right-1/3  bg-white py-8 px-8 flex flex-col font-manrope text-l font-semibold rounded-md"
      >
        <div className="flex justify-start pb-4 items-center w-full text-2xl bg-white-50 mb-4">
          {" "}
          Edit Supplier
        </div>
        <Formik
          initialValues={{
            supplier_name: supplier_name,
            supplier_email: supplier_email,
            supplier_afm: supplier_afm,
            supplier_webpage: supplier_webpage,
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
                disabled={true}
              />
              <ErrorMessage
                name="supplier_name"
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
                disabled={true}
              />
              <ErrorMessage
                name="supplier_afm"
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
                Edit
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
          <PopMessage message={"Supplier has been edited succesfully"} />
        )}
      </div>
    </>
  );
}

export default EditSupplier;
