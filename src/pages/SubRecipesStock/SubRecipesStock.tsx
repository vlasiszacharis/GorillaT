import React from "react";
import { useQuery } from "react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getStockSubRecipe } from "../../utils/api/apiClient";

function SubRecipesStock() {
  const { data: items, isLoading: subLoading } = useQuery(
    "stockSubRecipe",
    getStockSubRecipe
  );
  if (subLoading) {
    return <LoadingSpinner />;
  }
  const columns: GridColDef[] = [
    {
      field: "sub_recipe_id",
      headerName: "ID",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sub_recipe_name",
      headerName: "Name",
      flex: 1.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "sub_recipe_measurement_unit",
      headerName: "Unit",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
    },
  ];

  const rows = items.map((item: any, index: any) => ({
    id: index,
    ...item,
  }));

  return (
    <>
      {" "}
      <div
        style={{
          height: 600,
          width: "90%",
          paddingLeft: "90px",
          fontFamily: "manrope",
        }}
      >
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
            "& .MuiDataGrid-cell": {
              fontFamily: "Manrope, sans-serif",
              fontWeight: "550",
              width: "100%",
            },
          }}
        />
      </div>
    </>
  );
}

export default SubRecipesStock;
