import React from "react";

import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import LoadingSpinner from "../../components/LoadingSpinner";
import { getSubRecipes } from "../../utils/api/apiClient";
import Button from "../../components/Button";

function SubRecipes() {
  const [toggleSubRecipe, setToggleSubRecipe] = useState(false);
  const handleClick = () => {
    setToggleSubRecipe(!toggleSubRecipe);
  };

  const { data, isLoading } = useQuery("SubRecipe", getSubRecipes);
  const [selectedSubRecipe, setSelectedSubRecipe] = useState(null);

  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  if (data && data.length === 0) {
    return (
      <>
        {" "}
        <div className=" p-4 pr-20 gap-2 font-manrope text-l text-black text-opacity-70   font-semibold bg-slate-100">
          <div className="flex flex-row justify-between">
            <h2 className="flex flew-row items-center text-2xl pl-8 font-manrope font-extrabold text-black text-opacity-85 ">
              Sub Recipes
            </h2>
            <div className="flex flex-row justify-end  gap-4 ">
              <div className="flex flex-row">
                <Link to="/newsubrecipe">
                  <div onClick={handleClick}>
                    <Button
                      message={"Add Item"}
                      bgColor={"bg-blue-600"}
                      hoverBgColor={"hover:bg-custom-navy"}
                      textColor={"white"}
                      icon={<FaPlus size={20} />}
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center px-4 w-full font-manrope text-2xl font-semibold pt-4 bg-slate-100 border-gray-600 border pb-4">
          No sub-recipes.
        </div>
      </>
    );
  }
  const handleSubRecipeClick = (index: any) => {
    setSelectedSubRecipe(index === selectedSubRecipe ? null : index);
  };

  return (
    <>
      <div className=" p-4 pr-20 gap-2 font-manrope text-l text-black text-opacity-70   font-semibold ">
        <div className="flex flex-row justify-between">
          <h2 className="flex flew-row items-center text-2xl pl-8 font-manrope font-extrabold text-black text-opacity-85 ">
            Sub Recipes
          </h2>
          <div className="flex flex-row justify-end  gap-4 ">
            <div className="flex flex-row">
              <Link to="/newsubrecipe">
                <div onClick={handleClick}>
                  <Button
                    message={"SubRecipe"}
                    bgColor={"bg-blue-600"}
                    hoverBgColor={"hover:bg-custom-navy"}
                    textColor={"white"}
                    icon={<FaPlus size={20} />}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid shadow-md grid-cols-5 items-center py-2 border   rounded-tr-md rounded-tl-md mx-4 mr-6  font-manrope text-xl font-bold   bg-white  ">
        <span className="flex justify-center items-center">ID</span>
        <span className="flex justify-center items-center">Title</span>
        <span className="flex justify-center items-center">Description</span>
        <span className="flex justify-center items-center">Quantity</span>
        <span className="flex justify-center items-center">Food Cost</span>
      </div>
      {data?.map((subRecipeItem: any, index: number) => (
        <Accordion
          key={index}
          expanded={selectedSubRecipe === index}
          onChange={() => handleSubRecipeClick(index)}
          sx={{
            mx: 2,
            mr: 3,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <div className="grid grid-cols-5 mx-4 gap-6 w-full items-center font-manrope text-lg opacity-90 font-semibold">
              <span className="text-center">
                {subRecipeItem.priced_sub_recipe_id}
              </span>
              <span className="text-center">
                {subRecipeItem.priced_sub_recipe_title}
              </span>
              <span className="text-center">
                {subRecipeItem.priced_sub_recipe_description}
              </span>
              <span className="text-center">
                {subRecipeItem.priced_sub_recipe_quantity}
              </span>
              <span className="text-center">
                {subRecipeItem.priced_sub_recipe_food_cost}
              </span>
            </div>
          </AccordionSummary>

          <AccordionDetails className="flex bg-white rounded-2xl mx-5 flex-col space-y-1 font-manrope ">
            <Typography
              justifyContent="center"
              component="div"
              variant="h5"
              className="underline text-center"
              sx={{
                mx: 2,
                mr: 3,
              }}
            >
              Ingredients
            </Typography>
            {/* Ingredients Details */}
            {subRecipeItem.priced_sub_recipe_ingredients.map(
              (ingredient: any, ingredientIndex: any) => (
                <div
                  key={ingredientIndex}
                  className="grid grid-cols-5 gap-4 w-full my-6"
                >
                  <span className="text-center">
                    {ingredient.title || ingredient.sub_recipe_id}
                  </span>

                  <span className="text-center">
                    {ingredient.supplier_code || "N/A"}
                  </span>
                  <span className="text-center">
                    {ingredient.measurement_unit || "N/A"}
                  </span>
                  <span className="text-center pr-8">
                    {ingredient.quantity}
                  </span>
                  <span className="text-center">
                    {ingredient.food_cost || "Type: " + ingredient.type}
                  </span>
                </div>
              )
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export default SubRecipes;
