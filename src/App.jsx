import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signups";
import Login from "./Components/Logins";
import AdminPage from "./Components/AdminPage"; // Import AdminPage
import ManagerPage from "./Components/ManagerPage"; // Import ManagerPage
import EmployeePage from "./Components/EmployeePage";
import AllUsers from "./Components/AllUsers";
import SoftwarePage from "./Components/SoftwarePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/software" element={<SoftwarePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
