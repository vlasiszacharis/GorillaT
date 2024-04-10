import React, { ChangeEvent, useState } from "react";
import { getRecipes } from "../../utils/api/apiClient";
import { useQuery } from "react-query";
import { FaBook } from "react-icons/fa6";
import { RecipeModelUnique } from "../../types/apiClientTypes";
// interface MenuType {
//   id: number;
//   label: string;
// }

function AddNewMenu() {
  const [name, setName] = useState<string>();
  const [searchRecipe, setSearchRecipe] = useState("");
  // const [newMenu, setNewMenu] = useState<MenuType | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const { data: recipes } = useQuery("recipes", getRecipes);

  const handleRecipe = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchRecipe(event.target.value);
  };
  const visibleRecipes =
    recipes?.filter((recipes) =>
      recipes.recipe_title.toLowerCase().includes(searchRecipe.toLowerCase())
    ) || [];
  const handleMenuFocus = () => {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setTimeout(() => {
        setShowMenu(false);
      }, 200);
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  function handleItemClick(recipe: RecipeModelUnique): void {
    throw new Error("Function not implemented.");
  }

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
              <label htmlFor="menuName" className="font-medium text-gray-700">
                Name
              </label>
              <input
                id="menuName"
                name="menu_name"
                type="text"
                className="pl-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
                onChange={handleChange}
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
              <div>
                <select
                  id="menuCategory"
                  name="menuCategory"
                  className="mt-1 border py-1 border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="degustation">Degustation</option>
                  <option value="a_la_carte">À la carte</option>
                </select>
              </div>
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
          <div className="grid grid-cols-2 w-full gap-2">
            <div className="flex flex-col gap-2 col-span-1">
              <label htmlFor="menuNam" className="font-medium text-gray-700">
                Add Recipe
              </label>
              <div className="flex flex-row gap-1">
                <div className="bg-blue-100 w-8 h-8 rounded-md flex justify-center items-center">
                  <span className=" flex flex-row justify-center items-center">
                    <FaBook color="blue" size={14} />
                  </span>
                </div>
                <input
                  value={searchRecipe}
                  onChange={handleRecipe}
                  onFocus={handleMenuFocus}
                  onBlur={handleMenuFocus}
                  id="menuName"
                  name="menu_name"
                  type="text"
                  className="pl-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Name"
                />
              </div>
              {showMenu && (
                <div className="relative bg-white border border-gray-300 mt-1 rounded-md max-h-36 overflow-auto w-full">
                  {visibleRecipes.map((recipe: RecipeModelUnique) => (
                    <div
                      key={recipe.recipe_id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleItemClick(recipe)}
                    >
                      {recipe.recipe_title} - {recipe.recipe_description}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {" "}
              <div className="font-semibold text-lg font-manrope">
                Menu Name : {name}
              </div>
              <div></div>{" "}
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
