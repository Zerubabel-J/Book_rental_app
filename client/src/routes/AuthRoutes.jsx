import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import SignupForm from "../components/SignupForm";

const AuthRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    {/* Uncomment and add SignupPage once it's ready */}
    <Route path="/signup" element={<SignupForm />} />
  </Routes>
);

export default AuthRoutes;