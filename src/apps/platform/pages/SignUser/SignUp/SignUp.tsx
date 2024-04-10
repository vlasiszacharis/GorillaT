import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { postSignUp } from "../../../utils/api/apiClient";
import { useMutation, useQueryClient } from "react-query";
const ItemSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  acceptTerms: Yup.bool()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

function SignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(postSignUp, {
    onSuccess: () => {
      queryClient.invalidateQueries("SignUp");

      setTimeout(() => {
        navigate("/app/dashboard");
      }, 1200);
    },
    onError: (error) => {
      console.error("Failed to post data", error);
    },
  });

  const handleSubmit = (values: any) => {
    const newUser = {
      username: values.username,
      password: values.password,
    };

    mutation.mutate(newUser);
  };
  return (
    <>
      <div className="bg-custom-navy h-screen">
        <div className="flex justify-start items-center gap-1 pt-5 pl-8 ">
          <img src={logo} width={"70px"} className="App-logo" alt="logo" />

          <h1 className="font-manrope text-2xl tracking-wider text-white bg-custom-navy font-semibold text-opacity-100 ">
            <Link to="/app/dashboard">EasyKitchen</Link>
          </h1>
        </div>
        <div className="absolute xl:top-16 md:top-32 xl:left-1/3 xl:right-1/3 md:left-1/4 md:right-1/4  ">
          <div className="flex flex-col p-8 gap-4 bg-white rounded-lg  ">
            <Formik
              initialValues={{
                username: "",
                password: "",
                acceptTerms: false,
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
                    <label htmlFor="username" className="font-bold">
                      Name
                    </label>
                    <Field
                      name="username"
                      className="mt-1 py-2 w-full pl-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                      placeholder="Add username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div className="flex flex-col col-span-2">
                    <label htmlFor="password" className="font-bold">
                      Password
                    </label>
                    <Field
                      name="password"
                      className="mt-1 py-2 w-full pl-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                      placeholder="Add Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div className="flex flex-row gap-2 col-span-2">
                    <Field type="checkbox" name="acceptTerms" />
                    <label htmlFor="acceptTerms">
                      I accept the terms & conditions
                    </label>
                    <ErrorMessage
                      name="acceptTerms"
                      component="div"
                      className="text-red-600"
                    />
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
