import { Box, Button, Typography } from "@mui/material";
import React, { FC } from "react";
import Input from "../molecules/Input";
import { useForm } from "react-hook-form";

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  userId: number;
}

interface Props {
  onSubmit: (data: Omit<ProductFormData, "userId">) => void;
  title: string;
  buttonText: string;
}

const ProductForm: FC<Props> = ({ onSubmit, title, buttonText }) => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<Omit<ProductFormData, "userId">>({
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>

      <Input name="name" control={control} errors={errors} label="Nombre" />
      <Input name="description" control={control} errors={errors} label="Descripción" />
      <Input
        name="price"
        control={control}
        errors={errors}
        label="Precio"
        type="number"
      />

      <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default ProductForm;
