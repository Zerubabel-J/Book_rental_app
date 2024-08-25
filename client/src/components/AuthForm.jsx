import React from "react";
import { TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AuthForm = ({ formType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data); // Handle the form submission
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ""}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ mt: 3 }}
      >
        {formType === "login" ? "Login" : "Register"}
      </Button>
    </Box>
  );
};

export default AuthForm;
