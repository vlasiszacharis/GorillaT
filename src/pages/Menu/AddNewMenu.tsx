import React from "react";

function AddNewMenu() {
  return (
    <>
      <div className=" px-1 pr-2">
        {" "}
        <div className="bg-white p-8  rounded-lg mt-2  shadow-sm">
          <h2 className="text-2xl pl-4  font-semibold mb-4 text-gray-800 flex justify-center items-center">
            Add New Menu
          </h2>
          <h3 className="text-xl pl-4  font-semibold mb-4 text-gray-800">
            Menu Details
          </h3>
          <div className="grid grid-cols-1 w-1/2 gap-2">
            <div className="flex flex-col gap-2 col-span-1">
              <label htmlFor="menuNam" className="font-medium text-gray-700">
                Name
              </label>
              <input
                id="menuName"
                name="menu_name"
                type="text"
                className="pl-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
              />
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <label htmlFor="menuType" className="font-medium text-gray-700">
                Type
              </label>
              <input
                id="menuType"
                name="menuType"
                type="text"
                className="pl-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type"
              />
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <label
                htmlFor="menuCategory"
                className="font-medium text-gray-700"
              >
                Category
              </label>
              <input
                id="menuCategory"
                type="text"
                className="pl-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Category"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" px-1 pr-2">
        {" "}
        <div className="bg-white p-8  rounded-lg mt-2  shadow-sm">
          <h3 className="text-xl pl-4  font-semibold mb-4 text-gray-800">
            Menu Recipes
          </h3>
          <div className="grid grid-cols-1 w-1/2 gap-2">
            <div className="flex flex-col gap-2 col-span-1">
              <label htmlFor="menuNam" className="font-medium text-gray-700">
                Name
              </label>
              <input
                id="menuName"
                name="menu_name"
                type="text"
                className="pl-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
              />
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <label htmlFor="menuType" className="font-medium text-gray-700">
                Type
              </label>
              <input
                id="menuType"
                name="menuType"
                type="text"
                className="pl-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type"
              />
            </div>
            <div className="flex flex-col gap-2 col-span-1">
              <label
                htmlFor="menuCategory"
                className="font-medium text-gray-700"
              >
                Category
              </label>
              <input
                id="menuCategory"
                type="text"
                className="pl-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Category"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Menu
          </button>
        </div>
      </div>
    </>
  );
}

export default AddNewMenu;
