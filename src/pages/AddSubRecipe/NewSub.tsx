import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ChangeEvent } from "react";
import useCalculatePricePerUnit from "../../hooks/useCalculatePricePerUnit";
import useSubRecipeCalculate from "../../hooks/useSubRecipeCalculate";
import {
  getItems,
  postSubRecipe,
  getSubRecipes,
} from "../../utils/api/apiClient";
import {
  Ingredient,
  IngredientID,
  IngredientPost,
  PricedSubRecipeModelID,
  PricedSubRecipeModel,
  PricedSubRecipePost,
} from "../../types/apiClientTypes";

function NewSub() {
  const queryClient = useQueryClient();
  //States

  const [searchTerm, setSearchTerm] = useState("");
  const [ingredientsMenu, setIngredientsMenu] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientID[]
  >([]);
  const [showSub, setShowSub] = useState(false);
  const [searchSub, setSearchSub] = useState("");
  const [selectedSub, setSelectedSub] = useState<PricedSubRecipeModelID[]>([]);

  const { data: subs, isLoading: subLoading } = useQuery(
    "SubRecipes",
    getSubRecipes
  );
  const { data: items, isLoading: itemLoading } = useQuery<Ingredient[]>(
    "Items",
    getItems
  );

  const ingredientsCalculate = useCalculatePricePerUnit(items);
  const subRecipeCalculate = useSubRecipeCalculate(subs);
  console.log(subRecipeCalculate);
  const mutation = useMutation(postSubRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries("SubRecipes");
    },
    onError: (error) => {
      console.error("Error creating subrecipe:", error);
    },
  });

  if (itemLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (subLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  //Events
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handleSub = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchSub(event.target.value);
  };
  const handleIngredientFocus = () => {
    if (!ingredientsMenu) {
      setIngredientsMenu(true);
    }
  };

  const handleItemClick = (item: Ingredient) => {
    const newItem: IngredientID = {
      ...item,
      id: uuidv4(),
    };

    setSelectedIngredients((prev) => [...prev, newItem]);
    setIngredientsMenu(false);
    setSearchTerm("");
  };
  const handleSubClick = (subrecipe: PricedSubRecipeModel) => {
    const newSub: PricedSubRecipeModelID = { ...subrecipe, id: uuidv4() };
    setSelectedSub((prev) => [...prev, newSub]);
    setShowSub(false);
    setSearchSub("");
  };

  const handleDelete = (id: string) => {
    setSelectedIngredients((prev) => prev.filter((item) => item.id !== id));
  };
  const handleDeleteSub = (id: any) => {
    setSelectedSub((prev) => prev.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (
    ingredientId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = Number(event.target.value);
    const updatedIngredients = selectedIngredients.map((ingredient) => {
      if (ingredient.id === ingredientId) {
        return {
          ...ingredient,
          item_quantity: newQuantity,
        };
      }
      return ingredient;
    });

    setSelectedIngredients(updatedIngredients);
  };
  const handleSubQuantityChange = (
    subRecipeId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedSubRecipes = selectedSub.map((subrecipe) => {
      const newQuantity = Number(event.target.value);
      if (subrecipe.id === subRecipeId) {
        return {
          ...subrecipe,
          priced_sub_recipe_quantity: newQuantity,
        };
      }
      return subrecipe;
    });

    setSelectedSub(updatedSubRecipes);
  };

  //Filter Ingredients & SubRecipes

  const visibleIngredients =
    ingredientsCalculate?.filter((item: Ingredient) =>
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const visibleSubRecipes =
    subRecipeCalculate?.filter((subrecipe: PricedSubRecipeModel) =>
      subrecipe.priced_sub_recipe_title
        .toLowerCase()
        .includes(searchSub.toLowerCase())
    ) || [];

  //Submit Form -> New SubRecipe
  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ingredientsPayload = selectedIngredients.map(
      (ingredient): IngredientPost => ({
        quantity: ingredient.item_quantity || 1,
        type: "ingredient",
        title: ingredient.item_name,
        supplier_code: ingredient.item_supplier_code,
        measurement_unit: ingredient.item_measurement_unit,
      })
    );

    const subRecipesPayload = selectedSub.map(
      (subrecipe): PricedSubRecipePost => ({
        quantity: subrecipe.priced_sub_recipe_quantity,
        type: "sub-recipe",
        sub_recipe_id: subrecipe.priced_sub_recipe_id,
      })
    );

    const combinedPayload = [...ingredientsPayload, ...subRecipesPayload];
    const newSubRecipe = {
      priced_sub_recipe_title: (
        event.currentTarget.elements.namedItem(
          "priced_sub_recipe_title"
        ) as HTMLInputElement
      )?.value,
      priced_sub_recipe_description: (
        event.currentTarget.elements.namedItem(
          "priced_sub_recipe_description"
        ) as HTMLInputElement
      )?.value,
      priced_sub_recipe_ingredients: combinedPayload,
    };

    mutation.mutate(newSubRecipe);
  };

  return (
    <>
      <form onSubmit={handleForm}>
        <div
          id="inventory_titles"
          className="flex flex-row justify-start pt-4 gap-2 items-center border-2 border-slate-100 bg-slate-50 font-semibold p-2 font-manrope text-lg mr-1    pl-10"
        >
          {" "}
          <h2 className="font-manrope pl-8  font-semibold justify-start items-center">
            Create New Sub-Recipe
          </h2>
        </div>

        {/* Name */}
        <div className="bg-slate-100 p-4 gap-3 rounded-lg mt-2 border-2 border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Add New Recipe
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="recipeName" className="font-medium text-gray-700">
                Name
              </label>
              <input
                id="recipeName"
                name="priced_sub_recipe_title"
                type="text"
                className="pl-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="recipeDescription"
                className="font-medium text-gray-700"
              >
                Description
              </label>
              <input
                id="recipeDescription"
                name="priced_sub_recipe_description"
                type="text"
                className="pl-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Description"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="recipeCategory"
                className="font-medium text-gray-700"
              >
                Category
              </label>
              <input
                id="recipeCategory"
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
            Add Recipe
          </button>
        </div>
        {/* Ingredients */}
        <div className="flex flex-col justify-start pt-4 items-start mt-2 border-2 border-slate-100 gap-2 bg-slate-50 font-semibold p-12 font-manrope text-base mr-1  pl-10">
          <h3 className="text-base font-semibold">Ingredients</h3>
          <div className="flex flex-col">
            <input
              value={searchTerm}
              onChange={handleChange}
              onFocus={handleIngredientFocus}
              className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none hover:border-gray-700 mt-2"
              placeholder="Search and add an ingredient"
            />
            {ingredientsMenu && (
              <div className="relative bg-white border border-gray-300 mt-1 rounded-md max-h-36 overflow-auto w-full">
                {visibleIngredients.map((item: Ingredient) => (
                  <div
                    key={item.item_supplier_code}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    {item.item_name} - {item.item_supplier_name}
                  </div>
                ))}
              </div>
            )}
            {selectedIngredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="flex items-center justify-between gap-2 p-2 text-sm"
              >
                <input
                  className="pl-2 border border-gray-300 rounded-md flex-grow"
                  value={`${ingredient.item_name} - ${ingredient.item_supplier_name}`}
                  readOnly
                />
                <input
                  id={`quantity-${ingredient.id}`}
                  type="number"
                  min="1"
                  className="w-20 pl-2 py-1  border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none hover:border-gray-700"
                  placeholder="Quantity"
                  onChange={(e) => handleQuantityChange(ingredient.id, e)}
                />

                <div>
                  {(
                    ingredient.item_quantity * ingredient.item_pricePerUnit
                  ).toFixed(3)}
                  $
                </div>
                <button
                  onClick={() => handleDelete(ingredient.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* SubRecipes */}
        <div className="flex flex-col justify-start pt-4 items-start mt-2 border-2 border-slate-100 bg-slate-50 font-semibold p-12 font-manrope text-md mr-1  pl-10 gap-1">
          <h3 className=" font-semibold text-lg">Sub Recipes</h3>

          <div className="flex flex-col ">
            {selectedSub.map((subrecipe) => (
              <div
                key={subrecipe.id}
                className="flex items-center gap-2 p-2 text-sm"
              >
                <input
                  className=" border border-gray-300 rounded-md flex-1"
                  value={`${subrecipe.priced_sub_recipe_title} - ${subrecipe.priced_sub_recipe_description}`}
                  readOnly
                />
                <input
                  type="number"
                  min="1"
                  onChange={(e) => handleSubQuantityChange(subrecipe.id, e)}
                  className="w-20 pl-2 py-1 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none hover:border-gray-700"
                  placeholder="Quantity"
                />
                <div>
                  {(
                    subrecipe.priced_sub_recipe_quantity *
                    subrecipe.priced_sub_recipe_pricePerUnit
                  ).toFixed(2)}
                  $
                </div>
                <button
                  onClick={() => handleDeleteSub(subrecipe.id)}
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
            <input
              value={searchSub}
              onChange={handleSub}
              onFocus={() => setShowSub(true)}
              className="pl-2 border border-gray-300 rounded-md focus:border-gray-600 focus:ring-1 focus:ring-gray-700 focus:outline-none hover:border-gray-700"
              placeholder="Search and add a sub-recipe"
            ></input>
            {showSub && (
              <div className="relative bg-white border border-gray-300 mt-1 rounded-md max-h-36 overflow-auto w-80">
                {visibleSubRecipes.map((subrecipe: PricedSubRecipeModel) => (
                  <div
                    key={subrecipe.priced_sub_recipe_id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSubClick(subrecipe)}
                  >
                    <span>
                      {subrecipe.priced_sub_recipe_title} -{" "}
                      {subrecipe.priced_sub_recipe_description}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default NewSub;
