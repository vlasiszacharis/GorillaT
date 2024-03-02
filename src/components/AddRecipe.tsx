import React from "react";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface AddRecipeProps {
  setToggleRecipe: (value: boolean) => void;
}
function AddRecipe({ setToggleRecipe }: AddRecipeProps) {
  const handleClick = () => {
    setToggleRecipe(false);
  };

  interface StateIngredient {
    name: string;
    quantity: string;
  }
  const [ingredients, setIngredients] = useState<StateIngredient[]>([
    { name: "", quantity: "" },
  ]);

  const handleIngredientChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [event.target.name]: event.target.value };
      }
      return ingredient;
    });
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };
  const deleteIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };
  return (
    <>
      <div
        id="add_supplier"
        className="absolute  z-10 top-20 right-1/3 bg-slate-100 pb-24 py-6 gap-2 px-10 flex flex-col font-manrope text-l font-semibold rounded-md "
      >
        <div className="flex flex-center items-center  w-full text-xl bg-slate-100">
          {" "}
          New Recipe
        </div>

        <div className="flex flex-row gap-8 p-4 items-start justify-start">
          <span className="font-bold">Dish Name</span>
          <input
            className="pl-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="Add Dish Name"
          ></input>
        </div>

        <div className="flex flex-row gap-8 p-4 pl-8 items-start justify-start focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ">
          <span className=" font-bold">Category</span>
          <select>
            <option>Lunch</option>
            <option>Beverage</option>
            <option>Breakfast</option>
            <option>Snack</option>
            <option>Starters</option>
            <option>Appetizer</option>
          </select>{" "}
        </div>
        <div className="flex flex-col gap-4 p-2 items-center justify-center ">
          <span className=" font-bold">Ingredients</span>
          <form>
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <input
                  className="pl-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  name="name"
                  type="text"
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChange={(event) => handleIngredientChange(index, event)}
                />
                <input
                  className="pl-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  name="quantity"
                  type="text"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(event) => handleIngredientChange(index, event)}
                />
                {index === ingredients.length - 1 && (
                  <button
                    className="pl-2"
                    type="button"
                    onClick={addIngredient}
                  >
                    <FaPlus />
                  </button>
                )}
                {ingredients.length > 1 && (
                  <button
                    className="pl-2"
                    type="button"
                    onClick={() => deleteIngredient(index)}
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            ))}
          </form>
        </div>

        <div className="absolute top-2 right-2 ">
          <button onClick={handleClick}>
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
          <button className="bg-green-600 hover:bg-green-700 p-3 w-28 font-normal justify-center items-center text-white rounded-md">
            Add Recipe
          </button>
        </div>
      </div>
    </>
  );
}

export default AddRecipe;
