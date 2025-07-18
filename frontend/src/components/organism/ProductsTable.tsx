import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetProductsByUserQuery } from "@/api/frontendApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ProductsTable = () => {
  const userId = useSelector((state: RootState) => state.userId.userId);
  console.log(userId);
  const { data: dataProducts } = useGetProductsByUserQuery({ userId, page: 1 });
  console.log(dataProducts);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 90,
    },
  ];

  const rows =
    dataProducts?.products?.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    })) || [];

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        //initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
};

export default ProductsTable;
