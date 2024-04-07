import React from "react";
import { getRecipe } from "../../utils/api/apiClient";
import { useQuery } from "react-query";

import { IoBookSharp, IoClose } from "react-icons/io5";
import { TbCoins } from "react-icons/tb";
import LoadingSpinner from "../../components/LoadingSpinner";
import { PricedIngredientModel } from "../SubRecipes/NewSubRecipe/newSubTypes";

interface RecipeIDProps {
  sub: number;
  setToggleEdit: Function;
}
function RecipeID({ sub, setToggleEdit }: RecipeIDProps) {
  const { data, isLoading } = useQuery(["Recipes", sub], () => getRecipe(sub));
  if (isLoading)
    return (
      <>
        <div className="fixed top-1/2">
          {" "}
          <LoadingSpinner />;
        </div>
      </>
    );
  if (data === null || data === undefined) {
    return <div>No data available.</div>;
  }
  const handleClick = () => {
    setToggleEdit(false);
  };
  console.log(data?.recipe_ingredients);
  const ingredients: PricedIngredientModel[] = data?.recipe_ingredients || [];

  return (
    <div className="absolute z-40 top-10 left-1/4 right-1/4 mx-4 bg-white pb-15 py-8 gap-6 px-7 flex flex-col font-manrope text-l font-semibold rounded-md">
      <div className="flex flex-row justify-start items-center gap-12">
        <div className="flex flex-row gap-2 justify-center items-center ">
          <div className="bg-blue-100 w-14 h-14 rounded-md flex justify-center items-center ">
            <span className=" flex flex-row justify-center items-center">
              <IoBookSharp color="blue" size={24} />
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-3xl font-manrope ">
              {data?.recipe_title}
            </h3>
            <div className="font-medium text-lg">
              {data?.recipe_description}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className=" w-14 bg-yellow-100 h-14 rounded flex justify-center items-center">
            <TbCoins className="text-yellow-600 flex justify-center item-center w-7 h-7" />{" "}
          </div>
          <div className="flex flex-col ">
            {" "}
            <div className="font-semibold text-3xl">
              {" "}
              {data?.recipe_food_cost}$
            </div>
            <h4 className=" font-medium text-lg">Food Cost</h4>
          </div>
        </div>
      </div>

      {/* <div>Quantity :{data?.priced_sub_recipe_quantity}</div> */}

      <div className="flex flex-row gap-36">
        <h2 className="font-semibold text-2xl pt-4">
          Detailed Ingredient Costs
        </h2>
        <button className="bg-gray-100 w-10 h-10 rounded-base">Edit</button>
      </div>
      <table className="table-auto w-full border-collapse ">
        <thead>
          <tr>
            <th className="border px-4 py-2">Ingredient</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Supplier Code</th>
            <th className="border px-4 py-2">Measurement Unit</th>
            <th className="border px-4 py-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient: any, index: any) => (
            <tr key={index}>
              <td className="border px-4 py-2">{ingredient.title}</td>
              <td className="border px-4 py-2">{ingredient.quantity}</td>
              <td className="border px-4 py-2">{ingredient.food_cost}</td>
              <td className="border px-4 py-2">{ingredient.supplier_code}</td>
              <td className="border px-4 py-2 flex justify-center items-center">
                {ingredient.measurement_unit}
              </td>
              <td className="border px-4 py-2">{ingredient.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="absolute top-8 right-3">
        <button className="cursor-pointer" onClick={handleClick}>
          <IoClose size={30} />
        </button>
      </div>
    </div>
  );
}
export default RecipeID;
