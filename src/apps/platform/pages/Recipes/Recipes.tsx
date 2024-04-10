import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";
import LoadingSpinner from "../../components/LoadingSpinner";
import { getRecipes, postSubRecipeID } from "../../utils/api/apiClient";
import Button from "../../components/Button";
import { FaCheck } from "react-icons/fa6";

import { CiEdit } from "react-icons/ci";

// import SubRecipeID from "./SubRecipeID";
import { PricedSubRecipeModelUnique } from "../../types/apiClientTypes";
import Modal from "../../components/Modal";
import RecipeID from "./RecipeID";

function Recipes() {
  const [sub, setSub] = useState<number | undefined>(undefined);
  const [toggleEdit, setToggleEdit] = useState(false);
  const { data, isLoading, error } = useQuery("Recipes", getRecipes);

  const mutation = useMutation(postSubRecipeID, {
    onSuccess: (data) => {
      console.log("Data posted successfully", data);
    },
    onError: (error) => {
      console.error("Failed to post data", error);
    },
  });
  if (isLoading) return <LoadingSpinner />;
  if (data === null || data === undefined) {
    return <div>No data available.</div>;
  }
  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return <div>Error: {errorMessage}</div>;
  }

  const handleExecution = (id: number) => {
    mutation.mutate(id);
  };
  const handleEdit = (id: number) => {
    setSub(id);
    setToggleEdit(!toggleEdit);
  };
  const columns: GridColDef[] = [
    {
      field: "recipe_id",
      headerName: "ID",
      flex: 0.5,
      minWidth: 90,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "recipe_title",
      headerName: "Title",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "recipe_description",
      headerName: "Description",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "recipe_quantity",
      headerName: "Quantity",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "recipe_food_cost",
      headerName: "Food Cost",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "recipe_ingredients",
      headerName: "Ingredients",
      sortable: false,
      flex: 1,
      maxWidth: 140,
      headerAlign: "center",
      align: "center",
      renderCell: (params: {
        row: {
          recipe_id: any;
        };
      }) => (
        <>
          {" "}
          <div className="flex flex-row gap-2">
            {" "}
            <button
              onClick={() => handleEdit(params.row.recipe_id)}
              className="bg-gray-200 p-3 hover:bg-gray-300 rounded-md"
            >
              <CiEdit className="text-gray-800 " />
            </button>
            <button
              onClick={() => handleExecution(params.row.recipe_id)}
              className="bg-green-200 p-3 hover:bg-green-300 rounded-md"
            >
              <FaCheck />
            </button>
          </div>
        </>
      ),
    },
  ];
  console.log(data);

  const rows: PricedSubRecipeModelUnique[] =
    data?.map((supplier: any, index: any) => ({
      id: index,
      ...supplier,
    })) ?? [];

  if (isLoading)
    return (
      <div>
        <LoadingSpinner />.
      </div>
    );

  return (
    <>
      <div className=" p-4 pr-20 gap-2 font-manrope text-l text-black text-opacity-70   font-semibold bg-slate-100">
        <div className="ml-2 flex flex-row justify-between">
          <div className="flex flex-row justify-start  gap-4 ">
            <div className="flex flex-row">
              <Link to="/app/newrecipe">
                <Button
                  message={"Recipe"}
                  bgColor={"bg-blue-600"}
                  hoverBgColor={"hover:bg-custom-navy"}
                  textColor={"white"}
                  icon={<FaPlus size={20} />}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg justify-center items-center flex ml-7 h-[640px] w-[95%]  3xl:h-[864px]">
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "700",
              width: "100%",
              fontFamily: "manrope",
              fontSize: "18px",
            },
            "& .MuiDataGrid-columnHeader": {
              borderRight: "1px solid #ccc",
            },
            "& .MuiDataGrid-cell": {
              fontFamily: "Manrope, sans-serif",
              fontWeight: "550",
              width: "100%",
              borderRight: "1px solid #ccc",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "2px solid #ccc",
            },
            "& .MuiDataGrid-columnHeader:last-child": {
              borderRight: "none",
            },
            "& .MuiDataGrid-cell:last-of-type": {
              borderRight: "none",
            },
          }}
        />
      </div>
      {sub !== undefined && toggleEdit && (
        <RecipeID sub={sub} setToggleEdit={setToggleEdit} />
      )}
      {sub !== undefined && toggleEdit && <Modal />}
    </>
  );
}

export default Recipes;
