import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";

function App() {
  return (
    <>
      {/* <h1>የመጻሕፍት ዓለም</h1> */}
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
