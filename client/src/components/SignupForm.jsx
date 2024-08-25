import React from "react";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signup } from "../services/auth"; // Import the signup function

// Define the schema using Zod
const signupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Role is required"),
});

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Call the signup function from the auth service
      const result = await signup(
        data.username,
        data.email,
        data.password,
        data.role
      );
      console.log("Signup successful:", result);
      // Handle successful signup (e.g., redirect user or show a success message)
    } catch (error) {
      console.error("Signup failed:", error.message);
      // Handle signup failure (e.g., show error message to user)
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : ""}
          />
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
          <TextField
            fullWidth
            label="Role"
            margin="normal"
            {...register("role")}
            error={!!errors.role}
            helperText={errors.role ? errors.role.message : ""}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 3 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupForm;
