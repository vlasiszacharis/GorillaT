import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

import { useMutation, useQuery, useQueryClient } from "react-query";

import LoadingSpinner from "../../components/LoadingSpinner";
import { putItem } from "../../utils/api/apiClient";
import { getSuppliers } from "../../utils/api/apiClient";
import { EditItemPros } from "../../types/apiClientTypes";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PopMessage from "../../components/PopMessage";

const ItemSchema = Yup.object({
  item_supplier_name: Yup.string().required("Supplier Name is required"),
  item_supplier_code: Yup.string().required("Supplier Code is required"),
  item_name: Yup.string().required("Item Name is required"),
  item_measurement_unit: Yup.string().required("Unit is required"),
  item_category: Yup.string().required("Category is required"),
  item_quantity: Yup.number()
    .typeError("Only numbers are allowed for Quantity") // Custom message for non-number input
    .required("Quantity is required") // Custom message for when no value is provided
    .positive("Quantity must be positive"), // Validation for positive numbers, adjust as needed
  item_description: Yup.string().required("Description is required"),
});
function EditItem({
  setToggleEdit,
  item_supplier_name,
  item_supplier_code,
  item_name,
  item_measurement_unit,
  item_category,
  item_quantity,
}: EditItemPros) {
  const [successMessage, setSuccessMessage] = useState(false);
  const handlePopMessage = () => {
    setSuccessMessage(true);
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(putItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("Items");
      handlePopMessage();
      setTimeout(() => {
        setToggleEdit(false);
      }, 15000);
    },
    onError: (error) => {
      console.error("Error creating supplier:", error);
    },
  });

  const handleClick = () => {
    setToggleEdit(false);
  };

  // Fetch Suppliers ->Supplier Name select
  const { data, isLoading } = useQuery("Suppliers", getSuppliers);
  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  const handleSubmit = (values: any) => {
    const editSupplier = {
      item_supplier_name: values.item_supplier_name,
      item_supplier_code: values.item_supplier_code,
      item_name: values.item_name,
      item_measurement_unit: values.item_measurement_unit,
      item_category: values.item_category,
      item_quantity: values.item_quantity,
      item_description: values.item_description,
      item_price: values.item_price,
    };
    mutation.mutate(editSupplier);
  };

  return (
    <>
      <div
        id="edit_item"
        className="absolute z-30 top-10 left-1/3 right-1/3 mx-4 bg-white pb-4 py-4 gap-4 px-5 flex flex-col font-manrope text-l font-semibold rounded-md"
      >
        <div className="flex flex-col gap-4 p-2 items-center justify-center">
          <Formik
            initialValues={{
              item_supplier_name: item_supplier_name,
              item_supplier_code: item_supplier_code,
              item_name: item_name,
              item_measurement_unit: item_measurement_unit,
              item_category: item_category,
              item_quantity: item_quantity,
              item_description: "",
            }}
            validationSchema={ItemSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="text-2xl flex justify-start font-bold text-center mb-8">
                Edit Item
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="item_supplier_name" className="font-bold">
                    Supplier Name
                  </label>

                  <Field
                    as="select"
                    name="item_supplier_name"
                    className="mt-1 border pl-2 py-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Select Supplier Name"
                    disabled={true}
                  >
                    <option value=""></option>
                    {data?.map((supplier, index) => (
                      <option key={index} value={supplier.supplier_name}>
                        {supplier.supplier_name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="item_supplier_name"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="item_supplier_code" className="font-bold">
                    Supplier Code
                  </label>
                  <Field
                    name="item_supplier_code"
                    className="mt-1 py-1 pl-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Add Supplier Code"
                    disabled={true}
                  />
                  <ErrorMessage
                    name="item_supplier_code"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col col-span-1">
                  <label htmlFor="item_name" className="font-bold">
                    Item Name
                  </label>
                  <Field
                    name="item_name"
                    className="mt-1 py-1 pl-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Add Item Name"
                  />
                  <ErrorMessage
                    name="item_name"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col col-span-1">
                  <label htmlFor="item_measurement_unit" className="font-bold">
                    Unit
                  </label>
                  <Field
                    as="select"
                    name="item_measurement_unit"
                    className="mt-1 border py-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Select Unit"
                  >
                    <option value=""></option>
                    <option value="KG">KG</option>
                    <option value="G">G</option>
                    <option value="BOXES">Boxes</option>
                  </Field>
                  <ErrorMessage
                    name="item_measurement_unit"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col col-span-1">
                  <label htmlFor="item_category" className="font-bold">
                    Category
                  </label>
                  <Field
                    as="select"
                    name="item_category"
                    className="mt-1 border py-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Select Category"
                  >
                    <option value=""></option>
                    <option value="FRESH">FRESH</option>
                    <option value="FROZEN">FROZEN</option>
                    <option value="DRY">DRY</option>
                  </Field>
                  <ErrorMessage
                    name="item_category"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col col-span-1">
                  <label htmlFor="item_quantity" className="font-bold">
                    Quantity
                  </label>
                  <Field
                    name="item_quantity"
                    className="mt-1 py-1 w-full pl-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Add Quantity"
                  />
                  <ErrorMessage
                    name="item_quantity"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col col-span-2">
                  <label htmlFor="item_description" className="font-bold">
                    Description
                  </label>
                  <Field
                    name="item_description"
                    className="mt-1 py-1 w-full pl-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Add Description"
                  />
                  <ErrorMessage
                    name="item_description"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col col-span-1">
                  <label htmlFor="item_price" className="font-bold">
                    Price
                  </label>
                  <Field
                    name="item_price"
                    className="mt-1 py-1 w-full pl-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                    placeholder="Add Price"
                  />
                  <ErrorMessage
                    name="item_price"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 px-2">
                <button
                  type="submit"
                  className="bg-custom-navy hover:bg-blue-800 py-2 px-6 w-full justify-center items-center font-normal text-white rounded-md transition duration-150 ease-in-out"
                >
                  Edit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="absolute top-4 right-3">
          <button className="cursor-pointer" onClick={handleClick}>
            <IoClose size={30} />
          </button>
        </div>
        {successMessage && (
          <PopMessage message={"Item has been edited succesfully"} />
        )}
      </div>
    </>
  );
}

export default EditItem;
