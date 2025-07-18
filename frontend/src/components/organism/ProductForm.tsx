import { Box, Button, Typography } from "@mui/material";
import React, { FC } from "react";
import Input from "../molecules/Input";
import { useFormContext } from "react-hook-form";
import { Theme } from "@mui/material/styles";

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
  } = useFormContext<Omit<ProductFormData, "userId">>();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        margin: "auto",
        maxWidth: 400,
        width: "100%",
        //backgroundColor: (theme: Theme) => theme.palette.primary.main,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>

      <Input name="name" control={control} errors={errors} label="Nombre" />
      <Input
        name="description"
        control={control}
        errors={errors}
        label="Descripción"
      />
      <Input
        name="price"
        control={control}
        errors={errors}
        label="Precio"
        type="number"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValid}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default ProductForm;
