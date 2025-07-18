"use client";
import Form from "@/components/organism/Form";
import { FormPropsTypes } from "@/components/organism/Form";
import { useLoginMutation } from "../../../api/frontendApi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";

const Login = () => {
  const [login] = useLoginMutation();
  const router = useRouter();

  const onSubmitHandler = async (data: FormPropsTypes) => {
    const { email, password } = data;
    try {
      const response = await login({
        email: email,
        password: password,
      }).unwrap();
      console.log("Login successful:", response);
      Cookies.set("token", response.access_token);
      router.push("/home/create-product");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Form
        onSubmit={onSubmitHandler}
        title="Login Form"
        buttonText="Sign In"
      />
      <Button
        variant="text"
        color="primary"
        onClick={() => router.push("/register")}
        sx={{ mt: 2 }}
      >
        ¿No tienes cuenta? Regístrate
      </Button>
    </Box>
  );
};

export default Login;
