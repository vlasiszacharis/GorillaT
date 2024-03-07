import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState } from "react";
// import EditSupplier from "./EditSupplier";
import Modal from "../../components/Modal";
import { DataGrid } from "@mui/x-data-grid";

import { GridColDef } from "@mui/x-data-grid";
import { getSuppliers, deleteSupplier } from "../../utils/api/apiClient";
import { Supplier } from "../../types/apiClientTypes";
import SuppliersMenu from "./SuppliersMenu";
import PopMessage from "../../components/PopMessage";

function SuppliersExcel() {
  const queryClient = useQueryClient();
  // Post Suppliers
  const mutation = useMutation(deleteSupplier, {
    onSuccess: () => {
      queryClient.invalidateQueries("Suppliers");
    },
    onError: (error) => {
      console.error("Error deleting supplier:", error);
    },
  });

  const [toggleEdit, setToggleEdit] = useState(false);

  // Get Suppliers
  const { data, error, isLoading } = useQuery("Suppliers", getSuppliers);

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return <div>Error: {errorMessage}</div>;
  }
  if (data && data.length === 0) {
    return (
      <>
        <SuppliersMenu />
        <div className=" flex flex-col justify-center items-center px-4 w-full font-manrope text-2xl font-semibold pt-4 bg-slate-100 border-gray-600 border pb-4">
          No registered suppliers.
        </div>
      </>
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
      minWidth: 120,
      headerAlign: "center",
      align: "center",
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

  const rows: Supplier[] =
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
  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return <div>Error: {errorMessage}</div>;
  }
  return (
    <>
      <SuppliersMenu />
      <PopMessage />

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
            "& .MuiDataGrid-columnHeader": {
              borderRight: "1px solid #ccc", // Adding right border to column headers for separation
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
      {/* {toggleEdit && (
        <EditSupplier
          setToggleEdit={setToggleEdit}
          supplierName={""}
          supplierCode={""}
        />
      )} */}
      {toggleEdit && <Modal />}
    </>
  );
}

export default SuppliersExcel;
