"use client";

import React from "react";
import Form from "@/components/organism/Form";
import { FormPropsTypes } from "@/components/organism/Form";
import { useRegisterMutation } from "../../../api/frontendApi";
import { useRouter } from "next/navigation";

const Register = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();

  const onSubmitHandler = async (data: FormPropsTypes) => {
    const { email, password } = data;

    try {
      const response = await register({ email, password }).unwrap();
      console.log("User registered successfully:", response);
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <Form
        onSubmit={onSubmitHandler}
        title="Registro de Usuario"
        buttonText="Registrarse"
      />
    </div>
  );
};

export default Register;

