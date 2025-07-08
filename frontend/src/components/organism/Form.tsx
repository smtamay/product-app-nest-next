import { Box, Button, Typography } from "@mui/material";
import React, { FC } from "react";
import Input from "../molecules/Input";
import { useForm } from "react-hook-form";

export interface FormPropsTypes {
  email: string;
  password: string;
}

interface FormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  title: string;
  buttonText: string;
}

const Form: FC<FormProps> = ({ onSubmit, title, buttonText }) => {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<FormPropsTypes>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
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
      <Input name="email" control={control} errors={errors} label="Email" />
      <Input
        name="password"
        control={control}
        errors={errors}
        label="Password"
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

export default Form;
