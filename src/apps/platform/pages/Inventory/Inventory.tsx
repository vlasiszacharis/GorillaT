import React from "react";
import { FaPlus } from "react-icons/fa";
import { IoScanOutline } from "react-icons/io5";
import { MdInsertDriveFile } from "react-icons/md";
import { useState } from "react";
import AddItem from "./AddItem";
import Modal from "../../components/Modal";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Button from "../../components/Button";
import { DataGrid } from "@mui/x-data-grid";
import LoadingSpinner from "../../components/LoadingSpinner";
import { GridColDef } from "@mui/x-data-grid";
import { deleteItem, getItems } from "../../utils/api/apiClient";
import { Ingredient } from "./inventoryTypes";
import EditItem from "./EditItem";

function Inventory() {
  const [toggleItem, setToggleItem] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [supplierName, setSupplierName] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [unit, setUnit] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("Items");
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });
  const handleDelete = (params: any) => {
    const itemData = {
      item_supplier_name: params.row.item_supplier_name,
      item_supplier_code: params.row.item_supplier_code,
    };
    mutation.mutate(itemData);
  };

  const handleItem = () => {
    setToggleItem(!toggleItem);
  };

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
      headerName: "",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 120,
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
        <div className="flex flex-row  gap-4">
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
            className="bg-blue-500 p-3 hover:bg-blue-700 rounded-md"
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

  const rows: Ingredient[] =
    data?.map((inventory: any, index: any) => ({
      id: index,
      ...inventory,
    })) ?? [];

  return (
    <>
      <div className=" p-4 pr-20  font-manrope text-l text-black text-opacity-70  font-semibold ">
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
      {toggleEdit && data && data.length > 0 && (
        <EditItem
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

      <div className=" shadow-md h-[647px] w-[95%] bg-white ml-8 font-manrope 3xl:h-[862px]">
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
              borderRight: "1px solid #e0e0e0",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "2px solid #e0e0e0",
            },
            "& .MuiDataGrid-row": {
              "& .MuiDataGrid-cell:last-of-type": {
                borderRight: "none",
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default Inventory;
