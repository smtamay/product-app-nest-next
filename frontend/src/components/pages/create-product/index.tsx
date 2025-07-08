"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  useCreateProductMutation,
  useGetCurrentUserQuery,
} from "../../../api/frontendApi";
import ProductForm, { ProductFormData } from "@/components/organism/ProductForm";


const CreateProductPage = () => {
  const router = useRouter();
  const { data: user, isLoading, isError } = useGetCurrentUserQuery(undefined);
  const [createProduct] = useCreateProductMutation();

  useEffect(() => {
    if (isError) {
      router.push("/login");
    }
  }, [isError, router]);

  const handleCreate = async (formData: Omit<ProductFormData, "userId">) => {
    if (!user?.id) return alert("User not authenticated");

    const fullData: ProductFormData = {
      ...formData,
      userId: user.id,
    };

    try {
      await createProduct(fullData).unwrap();
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product. Please try again.");
    }
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
    <ProductForm
      onSubmit={handleCreate}
      title="Crear producto"
      buttonText="Crear"
    />
    </div>
  );
};

export default CreateProductPage;

