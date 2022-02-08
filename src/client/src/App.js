import Layout from "./components/Layout";
import Login from "./components/Login";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/*" element={<Layout />} />
        <Route path="/login" element={<Login />} />
=======
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Layout />} />
>>>>>>> main
      </Routes>
    </BrowserRouter>
  );
}

export default App;
