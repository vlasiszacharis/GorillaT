import React from "react";
import { useState } from "react";
import AddStockItem from "./AddStockItem";
import Modal from "../../components/Modal";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from "react-query";
import EditStockItem from "./EditStockItem";
import { DataGrid } from "@mui/x-data-grid";
import LoadingSpinner from "../../components/LoadingSpinner";
import { GridColDef } from "@mui/x-data-grid";
import SubRecipesStock from "../SubRecipes/SubRecipesStock/SubRecipesStock";
import { deleteStockItem, getStockItems } from "../../utils/api/apiClient";
import { StockItem } from "../../types/apiClientTypes";
import StockMenu from "./StockMenu";

function Stock() {
  const [isActive, setIsActive] = useState(true); // true for Ingredients, false for SubRecipes
  const [toggleItem, setToggleItem] = useState(false);

  const [toggleEdit, setToggleEdit] = useState(false);
  const [supplierName, setSupplierName] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  const queryClient = useQueryClient();
  // Delete Stock Item
  const mutation = useMutation(deleteStockItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("StockItem");
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });

  const handleEdit = (
    item_supplier_name: string,
    item_supplier_code: string,
    item_name: string,
    item_measurement_unit: string,
    item_category: string,
    item_quantity: any
  ) => {
    setToggleEdit(!toggleEdit);
    setSupplierName(item_supplier_name);
    setSupplierCode(item_supplier_code);
    setItemName(item_name);
    setUnit(item_measurement_unit);
    setCategory(item_category);
    setQuantity(item_quantity);
  };
  const handleDelete = (params: any) => {
    const itemData = {
      item_supplier_name: params.row.item_supplier_name,
      item_supplier_code: params.row.item_supplier_code,
    };
    mutation.mutate(itemData);
  };

  const { data, isLoading } = useQuery("StockItem", getStockItems);
  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  if (data && data.length === 0) {
    return (
      <>
        <StockMenu isActive={isActive} setIsActive={setIsActive} />
        <div className=" flex flex-col justify-center items-center px-4 w-full font-manrope text-2xl font-semibold pt-4 bg-slate-100 border-gray-600 border pb-4">
          No stock items.
        </div>
      </>
    );
  }
  const columns: GridColDef[] = [
    {
      field: "item_supplier_name",
      headerName: "Supplier Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "item_supplier_code",
      headerName: "Supplier Code",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "item_name",
      headerName: "Item Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "item_measurement_unit",
      headerName: "Unit",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "item_category",
      headerName: "Category",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "item_quantity",
      headerName: "Quantity",

      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: {
        row: {
          item_supplier_name: string;
          item_supplier_code: string;
          item_name: string;
          item_measurement_unit: string;
          item_category: string;
          item_quantity: any;
        };
      }) => (
        <div className="flex flex-row gap-4">
          <button
            onClick={() =>
              handleEdit(
                params.row.item_supplier_name,
                params.row.item_supplier_code,
                params.row.item_name,
                params.row.item_measurement_unit,
                params.row.item_category,
                params.row.item_quantity
              )
            }
            className="bg-blue-500 p-3 hover:bg-blue-600 rounded-md"
          >
            <CiEdit />
          </button>
          <button
            onClick={() => handleDelete(params)}
            className="bg-red-500 p-3 hover:bg-red-600 rounded-md"
          >
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];

  const rows: StockItem[] =
    data?.map((item: any, index: any) => ({
      id: index,
      ...item,
    })) ?? [];

  return (
    <>
      <StockMenu isActive={isActive} setIsActive={setIsActive} />
      {isActive && (
        <div className="bg-white shadow-lg ml-8 h-[545px] w-[95%]  font-manrope 3xl:h-[760px]">
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
                borderRight: "1px solid #e0e0e0", // Add right border to column headers
              },
              "& .MuiDataGrid-cell": {
                fontFamily: "Manrope, sans-serif",
                fontWeight: "550",
                width: "100%",
                borderRight: "1px solid #e0e0e0", // Add right border to each cell
              },
              "& .MuiDataGrid-columnHeader:last-child": {
                borderRight: "none",
              },
              "& .MuiDataGrid-cell:last-of-type": {
                borderRight: "none",
              },
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "2px solid #e0e0e0",
              },
            }}
          />

          {toggleEdit && (
            <EditStockItem
              setToggleEdit={setToggleEdit}
              item_supplier_name={supplierName}
              item_supplier_code={supplierCode}
              item_name={itemName}
              item_measurement_unit={unit}
              item_category={category}
              item_quantity={quantity}
            />
          )}
          {toggleEdit && <Modal />}
        </div>
      )}
      {!isActive && <SubRecipesStock />}

      {toggleItem && <AddStockItem setToggleItem={setToggleItem} />}
      {toggleItem && <Modal />}
    </>
  );
}

export default Stock;
