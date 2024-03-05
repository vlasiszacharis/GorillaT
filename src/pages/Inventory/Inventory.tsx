import React from "react";
import { FaPlus } from "react-icons/fa";
import { IoScanOutline } from "react-icons/io5";
import { MdInsertDriveFile } from "react-icons/md";
import { useState } from "react";
import AddItem from "../../components/AddItem";
import Modal from "../../components/Modal";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useQuery } from "react-query";
import Button from "../../components/Button";
import { DataGrid } from "@mui/x-data-grid";
import LoadingSpinner from "../../components/LoadingSpinner";
import { GridColDef } from "@mui/x-data-grid";
import { getItems } from "../../utils/api/apiClient";
import { Ingredient } from "../../types/apiClientTypes";

function Inventory() {
  const [toggleItem, setToggleItem] = useState(false);
  const handleItem = () => {
    setToggleItem(!toggleItem);
  };
  const { data, isLoading } = useQuery("Items", getItems);
  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

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
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "item_description",
      headerName: "Description",
      flex: 1,
      minWidth: 170,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "item_measurement_unit",
      headerName: "Unit",
      headerAlign: "center",
      align: "center",
      maxWidth: 70,
      flex: 1,
    },
    {
      field: "item_category",
      headerName: "Category",
      headerAlign: "center",
      align: "center",

      flex: 1,
    },
    {
      field: "item_quantity",
      headerName: "Quantity",
      headerAlign: "center",
      align: "center",
      maxWidth: 110,
      flex: 1,
    },
    {
      field: "item_price",
      headerName: "Price",
      flex: 1,
      headerAlign: "center",
      align: "center",
      maxWidth: 70,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => (
        <div className="flex flex-row gap-4">
          <button className="bg-blue-500 p-3 hover:bg-blue-600 rounded-md">
            <CiEdit />
          </button>
          <button className="bg-red-500 p-3 hover:bg-red-600 rounded-md">
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];

  const rows: Ingredient[] =
    data?.map((inventory: any, index: any) => ({
      id: index,
      ...inventory,
    })) ?? [];

  return (
    <>
      <div className=" p-4 pr-20  font-manrope text-l text-black text-opacity-70  font-semibold bg-slate-100">
        <div className="flex flex-row justify-end  ">
          <div className="flex flex-row "></div>
          <div className="flex flex-row">
            <div onClick={handleItem}>
              <Button
                message={"Add Item"}
                bgColor={"bg-blue-600"}
                hoverBgColor={"hover:bg-custom-navy"}
                textColor={"white"}
                icon={<FaPlus size={20} />}
              />
            </div>
          </div>
          <div className="flex flex-row ">
            <div>
              <Button
                message={"Scan"}
                bgColor={"bg-blue-600"}
                hoverBgColor={"hover:bg-custom-navy"}
                textColor={"white"}
                icon={<IoScanOutline size={20} />}
              />
            </div>
          </div>
          <div className="flex flex-row  ">
            <div>
              <Button
                message={"Insert"}
                bgColor={"bg-blue-600"}
                hoverBgColor={"hover:bg-custom-navy"}
                textColor={"white"}
                icon={<MdInsertDriveFile size={20} />}
              />{" "}
            </div>
          </div>
        </div>
      </div>
      {toggleItem && <AddItem setToggleItem={setToggleItem} />}
      {toggleItem && <Modal />}

      <div
        className="pl-1"
        style={{ height: 650, width: "96%", paddingLeft: "40px" }}
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

export default Inventory;
