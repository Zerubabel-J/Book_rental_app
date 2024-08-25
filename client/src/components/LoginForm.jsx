import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";
import AuthForm from "./AuthForm";
import { Link as RouterLink } from "react-router-dom";

const LoginForm = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <AuthForm formType="login" />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            New user?{" "}
            <Link component={RouterLink} to="/SignupForm">
              Create an account
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
