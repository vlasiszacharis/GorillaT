import React from "react";
import { TbCoins } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";
import { IoScanOutline } from "react-icons/io5";
import { MdInsertDriveFile } from "react-icons/md";
import { useState } from "react";
import AddStockItem from "../../components/AddStockItem";
import Modal from "../../components/Modal";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from "react-query";
import EditStockItem from "../../components/EditStockItem";
import { DataGrid } from "@mui/x-data-grid";
import LoadingSpinner from "../../components/LoadingSpinner";
import { GridColDef } from "@mui/x-data-grid";
import SubRecipesStock from "../SubRecipesStock/SubRecipesStock";
import { deleteStockItem, getStockItems } from "../../utils/api/apiClient";
import { StockItem } from "../../types/apiClientTypes";

function Stock() {
  const [isActive, setIsActive] = useState(true); // true for Ingredients, false for SubRecipes
  const [toggleItem, setToggleItem] = useState(false);
  const handleClick = () => {
    setToggleItem(!toggleItem);
  };

  const [toggleEdit, setToggleEdit] = useState(false);

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

  const handleEdit = () => {
    setToggleEdit(!toggleEdit);
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
      <div className=" flex flex-col justify-center items-center px-4 w-full font-manrope text-2xl font-semibold pt-4 bg-slate-100 border-gray-600 border pb-4">
        No stock items.
      </div>
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
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: { row: { id: number; supplier_afm: any } }) => (
        <div className="flex flex-row gap-4">
          <button
            onClick={() => handleEdit()}
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
      <div className=" p-4 pr-20 gap-2 font-manrope text-l text-black text-opacity-70   font-semibold bg-slate-100">
        <div className="flex flex-row justify-end gap-8 ">
          <div className="flex justify-center items-center  p-3 py-7 gap-8 bg-white rounded-xl shadow-md min-w-72 max-h-40">
            <div className="flex flex-col justify-center items-center gap-4">
              <h4 className="font-semibold text-2xl">Stock</h4>
              <div className="flex flex-col gap-4 p-2 bg-slate-100 rounded-xl">
                <div className="flex flex-row justify-center gap-4 text-xl">
                  <span
                    className={`${
                      !isActive
                        ? "text-black opacity-70"
                        : " text-black font-bold"
                    }`}
                  >
                    Ingredients
                  </span>
                  <div
                    className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer ${
                      isActive ? "bg-custom-navy" : "bg-custom-navy"
                    }`}
                    onClick={() => setIsActive(!isActive)}
                  >
                    {/* Switch */}
                    <div
                      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition duration-300 ease-in-out ${
                        !isActive ? "translate-x-7" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                  <span
                    className={`${
                      isActive
                        ? "text-black opacity-70"
                        : "text-black font-bold"
                    }`}
                  >
                    SubRecipes
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Stock Insights */}
          <div className="flex flex-row gap-4 pr-8">
            <div className="flex p-5 py-7  bg-white rounded-xl shadow-md min-w-52 max-h-40">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Total Stock Value</h4>
                <div className="flex flex-row items-center gap-3">
                  <div className=" w-10 bg-yellow-100 h-10 rounded flex justify-center items-center">
                    <TbCoins className="text-yellow-600 flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">67.254 $</div>
                </div>
              </div>
            </div>
            <div className="flex p-5 py-7 bg-white rounded-xl shadow-md min-w-48 max-h-40">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Positive Stock</h4>
                <div className="flex flex-row items-center gap-3">
                  <div className=" w-10 bg-green-100 h-10 rounded flex justify-center items-center">
                    <MdOutlineStoreMallDirectory className="text-green-600 flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">165</div>
                </div>
              </div>
            </div>
            <div className="flex p-5 py-7  bg-white rounded-xl shadow-md min-w-48 max-h-40">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Negative Stock</h4>
                <div className="flex flex-row items-center gap-3">
                  <div className=" w-10 bg-red-100 h-10 rounded flex justify-center items-center">
                    <MdOutlineStoreMallDirectory className="text-red-600 flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">25</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-4">
            {" "}
            <div className="flex flex-row text-xl ">
              <button>
                <div className="flex flex-row gap-2 hover:text-black hover:underline">
                  <IoScanOutline size={28} />
                  <span>Scan</span>
                </div>
              </button>
            </div>
            <div className="flex flex-row text-xl hover:text-black hover:underline">
              <button>
                <div className="flex flex-row gap-2">
                  <MdInsertDriveFile size={28} />
                  <span>Insert</span>
                </div>
              </button>
            </div>
            <div className="flex flex-row gap-1 text-xl">
              <button onClick={handleClick}>
                <div className="flex flex-row gap-1 items-center hover:text-black hover:underline">
                  <FaPlus size={28} /> <span>New Item</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isActive && (
        <div
          style={{
            height: 600,
            width: "96%",
            paddingLeft: "40px",
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
          {toggleEdit && (
            <EditStockItem
              setToggleEdit={setToggleEdit}
              supplierName={""}
              supplierCode={""}
            />
          )}
        </div>
      )}
      {!isActive && <SubRecipesStock />}

      {toggleItem && <AddStockItem setToggleItem={setToggleItem} />}
      {toggleItem && <Modal />}
    </>
  );
}

export default Stock;
