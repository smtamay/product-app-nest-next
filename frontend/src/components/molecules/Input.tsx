import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import {
  useController,
  FieldValues,
  FieldPath,
  UseFormReturn,
  RegisterOptions,
  FieldErrors,
  FieldName,
} from "react-hook-form";
import {
  ErrorMessage,
  FieldValuesFromFieldErrors,
} from "@hookform/error-message";

interface Props<TFieldValues extends FieldValues>
  extends Omit<TextFieldProps, "name" | "value" | "onChange"> {
  name: FieldPath<TFieldValues>;
  control: UseFormReturn<TFieldValues>["control"];
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
  onChange?: (value: string) => void;
  errors: FieldErrors<TFieldValues>;
}

const Input = <TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  onChange,
  errors,
  ...rest
}: Props<TFieldValues>) => {
  const {
    field: { value, onChange: fieldOnChange, ...field },
    fieldState: { error },
  } = useController<TFieldValues>({
    name,
    control,
    rules,
  });

  return (
    <TextField
      {...field}
      {...rest}
      value={value ?? ""}
      error={!!error}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e.target.value);
      }}
      helperText={
        error ? (
          <ErrorMessage
            errors={errors}
            name={
              name as unknown as FieldName<
                FieldValuesFromFieldErrors<FieldErrors<TFieldValues>>
              >
            }
            render={({ message }) => <>{message}</>}
          />
        ) : (
          rest.helperText
        )
      }
    />
  );
};

export default Input;
