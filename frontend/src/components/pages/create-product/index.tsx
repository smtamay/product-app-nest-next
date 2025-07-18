"use client";
import { FormProvider, useForm } from "react-hook-form";
import {
  useCreateProductMutation,
  useGetCurrentUserQuery,
} from "../../../api/frontendApi";
import ProductForm, {
  ProductFormData,
} from "@/components/organism/ProductForm";
import ProductsTable from "@/components/organism/ProductsTable";
import { Box } from "@mui/material";
import Signout from "@/components/atoms/Signout";

const CreateProductPage = () => {
  const { data: user, isLoading } = useGetCurrentUserQuery(undefined);
  const [createProduct] = useCreateProductMutation();

  const methods = useForm<Omit<ProductFormData, "userId">>({
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  const { reset } = methods;

  const handleCreate = async (formData: Omit<ProductFormData, "userId">) => {
    if (!user?.id) return alert("User not authenticated");

    const fullData: ProductFormData = {
      ...formData,
      userId: user.id,
    };

    try {
      await createProduct(fullData).unwrap();
      reset();
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product. Please try again.");
    }
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <Box component="div" sx={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <FormProvider {...methods}>
        <ProductForm
          onSubmit={handleCreate}
          title="Crear producto"
          buttonText="Crear"
        />
      </FormProvider>
      <ProductsTable />
      <Signout/>
    </Box>
  );
};


export default CreateProductPage;
