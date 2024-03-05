import React from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { useState } from "react";
import AddRecipe from "../../components/AddRecipe";
import Modal from "../../components/Modal";
import { FaSearch } from "react-icons/fa";
function Recipes() {
  const [toggleRecipe, setToggleRecipe] = useState(false);

  const handleNewRecipe = () => {
    setToggleRecipe(!toggleRecipe);
  };
  return (
    <>
      <div
        id="recipes_main"
        className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 pt-16 bg-slate-200   gap-2 items-center font-manrope text-2xl font-semibold  max-lg:ml-48 max-md:ml-0 "
      >
        <span className="flex flex-col items-center justify-center py-12 mx-2  bg-slate-100  ">
          <span>Photo</span>
          <button className="relative top-12 bg-blue-500 w-full text-white text-opacity-80 rounded-lg">
            <span className="flex flex-row pl-4">All</span>
          </button>
        </span>

        <span className="flex flex-col  items-center justify-center py-12 mx-2 rounded-x bg-slate-100 ">
          <span>Photo</span>

          <button className="relative top-12 bg-blue-500 w-full text-white text-opacity-80 rounded-lg">
            Breakfast
          </button>
        </span>

        <span className="flex flex-col items-center justify-center py-12 mx-2 rounded-xl bg-slate-100  ">
          <span>Photo</span>
          <button className="relative top-12 bg-blue-500 w-full text-white text-opacity-80 rounded-lg">
            Lunch
          </button>
        </span>

        <span className="flex flex-col  items-center justify-center py-12 mx-2 rounded-xl bg-slate-100  ">
          <span>Photo</span>
          <button className="relative top-12 bg-blue-500 w-full text-white text-opacity-80 rounded-lg">
            Main Dish
          </button>
        </span>
        <span className="flex flex-col  items-center justify-center py-12 mx-2 rounded-xl bg-slate-100  ">
          <span>Photo</span>
          <button className="relative top-12 bg-blue-500 w-full text-white text-opacity-80 rounded-lg">
            Dessert
          </button>
        </span>
        <span className="flex flex-col  items-center justify-center py-12 mx-2 rounded-xl bg-slate-100 ">
          <span>Photo</span>
          <button className="relative top-12 bg-blue-500 w-full text-white text-opacity-80 rounded-lg">
            Starters
          </button>
        </span>
        <span className="flex flex-col  items-center justify-center py-12 mx-2 rounded-xl bg-slate-100  ">
          <span>Photo</span>
          <button className="relative top-12 bg-blue-500 w-full text-white text-opacity-80 rounded-lg">
            Snack
          </button>
        </span>
        <span className="flex flex-col  items-center justify-center py-12 mx-2 rounded-xl bg-slate-100  ">
          <span>Photo</span>
          <button className="relative top-12 bg-blue-500 w-full text-white text-opacity-80 rounded-lg">
            Appetizer
          </button>
        </span>
        <span className="flex  flex-col items-center justify-center py-12 mx-2 rounded-xl bg-slate-100  ">
          <span>Photo</span>
          <button className="relative top-12 bg-blue-500 w-full text-white text-opacity-80 rounded-lg">
            Appetizer
          </button>
        </span>
        <span className="flex flex-col  items-center justify-center py-12 mx-2 rounded-xl bg-slate-100  ">
          <span>Photo</span>
          <button className="relative top-12 bg-blue-500 w-full text-white text-opacity-80 rounded-lg">
            Appetizer
          </button>
        </span>
        <span className="flex flex-col  items-center justify-center py-12 mx-2 rounded-xl bg-slate-100  ">
          <span>Photo</span>
          <button className="relative top-12 bg-blue-500 w-full text-white text-opacity-80 rounded-lg">
            Appetizer
          </button>
        </span>
        <span className="flex flex-col  items-center justify-center py-12 mx-2 rounded-xl bg-slate-100  ">
          <span>Photo</span>
          <button className="relative top-12 bg-blue-500 w-full text-white text-opacity-80 rounded-lg">
            Appetizer
          </button>
        </span>
      </div>
      <div
        id="recipes_nav"
        className="flex flex-row absolute top-4 right-8 font-manrope justify-center items-center rounded-md"
      >
        <div>
          <span className="absolute top-3 left-2">
            <FaSearch />
          </span>

          <input
            placeholder="Search recipes"
            className="pl-10 p-1 px-4 border border-gray-300 rounded-xl focus:border-gray-600 focus:ring-1 focus:ring-gray-600 focus:outline-none hover:border-gray-800"
          ></input>
        </div>

        <div className="flex justify-start  pl-4 items-center hover:text-black text-black text-opacity-70 ">
          <FaPlus />

          <button
            onClick={handleNewRecipe}
            className=" font-semibold py-2 px-2 rounded  "
          >
            New Recipe
          </button>
        </div>
        <div className="flex justify-start items-center pl-4   hover:text-black text-black text-opacity-70">
          <IoIosHome />
          <button className=" font-semibold py-2 px-3 rounded ">Home</button>
        </div>
        <div className="flex justify-start items-center pl-4  hover:text-black text-black text-opacity-70">
          <FaFilter />
          <button className=" font-semibold py-2 px-3  rounded">Filter</button>
        </div>
      </div>
      {toggleRecipe && <AddRecipe setToggleRecipe={setToggleRecipe} />}
      {toggleRecipe && <Modal />}
    </>
  );
}

export default Recipes;
