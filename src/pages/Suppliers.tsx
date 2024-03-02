/* eslint-disable array-callback-return */
import React from "react";
import { BASE_URL } from "../config/BaseUrl";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import LoadingSpinner from "../components/LoadingSpinner";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import axios from "axios";
import EditSupplier from "../components/EditSupplier";
import Modal from "../components/Modal";
import { DataGrid } from "@mui/x-data-grid";
import { FaRegSquarePlus } from "react-icons/fa6";
import { TbCoins } from "react-icons/tb";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import AddSupplier from "../components/AddSupplier";
import { GridColDef } from "@mui/x-data-grid";

const fetchSuppliers = async () => {
  const response = await axios.get(`${BASE_URL}/api/v1/suppliers`);
  return response.data;
};

const deleteSupplier = async (supplier_afm: number) => {
  const response = await axios.delete(
    `${BASE_URL}/api/v1/suppliers/${supplier_afm}`
  );
  return response.data;
};

function SuppliersExcel() {
  const queryClient = useQueryClient();
  // Post Suppliers
  const mutation = useMutation(deleteSupplier, {
    onSuccess: () => {
      queryClient.invalidateQueries("dataKey");
    },
    onError: (error) => {
      console.error("Error deleting supplier:", error);
    },
  });

  const [toggleEdit, setToggleEdit] = useState(false);
  const [toggleSupplier, setToggleSupplier] = useState(false);

  const handleAddSupplier = () => {
    setToggleSupplier(!toggleSupplier);
  };
  // Get Suppliers
  const { data, error, isLoading } = useQuery("dataKey", fetchSuppliers);

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return <div>Error: {errorMessage}</div>;
  }
  if (data && data.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center px-4 w-full font-manrope text-2xl font-semibold pt-4 bg-slate-100 border-gray-600 border pb-4">
        No registered suppliers.
      </div>
    );
  }
  const handleEdit = () => {
    setToggleEdit(!toggleEdit);
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    supplier_afm: number
  ) => {
    event.stopPropagation();
    mutation.mutate(supplier_afm);
  };

  interface Supplier {
    id: number;
    supplier_name: string;
    supplier_email: string;
    supplier_afm: string;
    supplier_webpage: string;
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      minWidth: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "supplier_name",
      headerName: "Supplier Name",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "supplier_email",
      headerName: "Supplier Email",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "supplier_afm",
      headerName: "Supplier AFM",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "supplier_webpage",
      headerName: "Supplier Webpage",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      minWidth: 160,
      headerAlign: "center",
      align: "center",
      renderCell: (params: { row: { id: number; supplier_afm: any } }) => (
        <>
          <div className="flex flex-row gap-4">
            <button
              onClick={(event) => handleEdit()}
              className="bg-blue-500 p-3 hover:bg-blue-600 rounded-md"
            >
              <CiEdit />
            </button>
            <button
              onClick={(event) => handleDelete(event, params.row.supplier_afm)}
              className="bg-red-500 p-3 hover:bg-red-600 rounded-md"
            >
              <MdDelete />
            </button>
          </div>
        </>
      ),
    },
  ];

  const rows = data.map((supplier: any, index: any) => ({
    id: index,
    ...supplier,
  }));

  if (isLoading)
    return (
      <div>
        <LoadingSpinner />.
      </div>
    );
  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return <div>Error: {errorMessage}</div>;
  }
  return (
    <>
      <div className=" p-2 py-2 pr-16 gap-2 font-manrope text-l text-black text-opacity-70   font-semibold bg-slate-100">
        <div className="flex flex-row justify-between  gap-4 pr-8">
          <div className="flex flex-row gap-4 p-2">
            {" "}
            <div className="flex p-5 py-9  bg-white rounded-xl shadow-md min-w-52">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Total Suppliers</h4>
                <div className="flex flex-row items-center gap-3">
                  <div className=" w-10 bg-yellow-100 h-10 rounded flex justify-center items-center">
                    <TbCoins className="text-yellow-600 flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">20</div>
                </div>
              </div>
            </div>
            <div className="flex p-5 py-9 bg-white rounded-xl shadow-md min-w-52">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Total Products</h4>
                <div className="flex flex-row items-center gap-3">
                  <div className=" w-10 bg-green-100 h-10 rounded flex justify-center items-center">
                    <MdOutlineStoreMallDirectory className="text-green-600 flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">1245</div>
                </div>
              </div>
            </div>
            <div className="flex p-5 py-9  bg-white rounded-xl shadow-md min-w-52">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-xl">Orders</h4>
                <div className="flex flex-row items-center gap-3">
                  <div className=" w-10 bg-red-100 h-10 rounded flex justify-center items-center">
                    <MdOutlineStoreMallDirectory className="text-red-600 flex justify-center item-center w-5 h-5" />{" "}
                  </div>
                  <div className="font-semibold text-2xl">25</div>
                </div>
              </div>
            </div>
          </div>
          <div className="  p-4 item-center justify-center gap-2 font-manrope text-l font-semibold bg-slate-100">
            <div className="flex flex-row gap-2 p-4 item-center justify-center">
              <span>
                <button
                  onClick={handleAddSupplier}
                  className="bg-blue-500 rounded p-2 text-white hover:bg-blue-600 flex flex-row gap-2 justify-center items-center text-center"
                >
                  <FaRegSquarePlus />
                  Add Supplier
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          height: 660,
          width: "96%",
          paddingLeft: "40px",
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
      {toggleEdit && (
        <EditSupplier
          setToggleEdit={setToggleEdit}
          supplierName={""}
          supplierCode={""}
        />
      )}
      {toggleEdit && <Modal />}
      {toggleSupplier && <AddSupplier setToggleSupplier={setToggleSupplier} />}
      {toggleSupplier && <Modal />}
    </>
  );
}

export default SuppliersExcel;
