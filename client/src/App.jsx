import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <h1>Welcome to the App</h1>
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
