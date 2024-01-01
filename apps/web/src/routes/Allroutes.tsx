import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Links from "../pages/dashboard/Links";
import Createnew from "../pages/dashboard/Createnew";
import PrivateRoute from "../components/PrivateRoute";
import Analytics from "../pages/dashboard/Analytics";
import Apiintegration from "../pages/dashboard/Apiintegration";


const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
      <Route index element={<PrivateRoute><DashboardHome /></PrivateRoute>} />
        <Route path="home" element={<PrivateRoute><DashboardHome /></PrivateRoute>} />
        <Route path="create-new" element={<PrivateRoute><Createnew /></PrivateRoute>} />
        <Route path="links" element={<PrivateRoute><Links /></PrivateRoute>} />
        <Route path="analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
        <Route path="api" element={<PrivateRoute><Apiintegration /></PrivateRoute>} />
      </Route>
    </Routes>
  );
};

export default Allroutes;
