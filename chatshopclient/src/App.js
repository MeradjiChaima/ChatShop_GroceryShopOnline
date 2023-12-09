import React from "react";
import Load from "./Pages/Load";
import Shops from "./Pages/Shops";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import UserProfile from "./Pages/userProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Load />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/shops/:shopId" element={<Products />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
