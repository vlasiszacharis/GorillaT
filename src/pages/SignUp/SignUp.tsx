import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
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
function SignUp() {
  const handleSubmit = (values: any) => {
    // const newSupplier = {
    //   item_supplier_name: values.item_supplier_name,
    //   item_supplier_code: values.item_supplier_code,
    //   item_name: values.item_name,
    //   item_measurement_unit: values.item_measurement_unit,
    //   item_category: values.item_category,
    //   item_quantity: values.item_quantity,
    //   item_description: values.item_description,
    //   item_price: values.item_price,
    // };
    console.log(values);
  };
  return (
    <>
      <div className="bg-custom-navy h-screen">
        <div className="flex justify-start items-center gap-1 pt-5 pl-8 ">
          <img src={logo} width={"70px"} className="App-logo" alt="logo" />

          <h1 className="font-manrope text-2xl tracking-wider text-white bg-custom-navy font-semibold text-opacity-100 ">
            <Link to="/dashboard">EasyKitchen</Link>
          </h1>
        </div>
        <div className="absolute top-16 left-1/3 right-1/3  ">
          <div className="flex flex-col p-8 gap-4 bg-white rounded-lg  ">
            <Formik
              initialValues={{
                item_supplier_name: "",
                item_supplier_code: "",
                item_name: "",
                item_measurement_unit: "",
                item_category: "",
                item_quantity: "",
                item_description: "",
              }}
              validationSchema={ItemSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="text-2xl flex justify-start font-bold text-center pb-8">
                  Registration
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col col-span-2">
                    <label htmlFor="item_price" className="font-bold">
                      Name
                    </label>
                    <Field
                      name="item_price"
                      className="mt-1 py-2 w-full pl-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                      placeholder="Add Price"
                    />
                    <ErrorMessage
                      name="item_price"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div className="flex flex-col col-span-2">
                    <label htmlFor="item_price" className="font-bold">
                      Email
                    </label>
                    <Field
                      name="item_price"
                      className="mt-1 py-2 w-full pl-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                      placeholder="Add Price"
                    />
                    <ErrorMessage
                      name="item_price"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div className="flex flex-row gap-2 col-span-2">
                    {" "}
                    <Field type="checkbox" name="acceptTerms" />
                    <label htmlFor="acceptTerms pb-1">
                      I accept the terms & conditions
                    </label>
                    <ErrorMessage name="acceptTerms" component="div" />
                  </div>
                </div>
                <div className="flex justify-end mt-4 px-2 pt-6">
                  <button
                    type="submit"
                    className="bg-custom-navy hover:bg-blue-800 py-3 px-6 w-full justify-center items-center font-normal text-white rounded-md transition duration-150 ease-in-out"
                  >
                    Register
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
