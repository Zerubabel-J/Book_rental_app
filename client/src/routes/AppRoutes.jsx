import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";

const AppRoutes = () => (
  <Routes>
    {/* Define other main routes here */}
    {/* Ensure this path matches the parent route */}
    <Route path="/*" element={<AuthRoutes />} />
    {/* If you have a HomePage or other main routes, define them above */}
  </Routes>
);

export default AppRoutes;
