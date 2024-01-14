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
import Url from "../pages/dashboard/Url";
import ApiDocumentation from "../pages/Apidocumentation/ApiDocumentation";
import Profile from "../pages/dashboard/Profile";
import Introduction from "../pages/Apidocumentation/Introduction";
import ShortenLink from "../pages/Apidocumentation/ShortenLink";
import RetrivingMatrix from "../pages/Apidocumentation/RetrivingMatrix";
import RedireactingLink from "../pages/Apidocumentation/RedireactingLink";
import TruboolshotingTips from "../pages/Apidocumentation/TruboolshotingTips";
import Authontication from "../pages/Apidocumentation/Authontication";


const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="apidocs" element={<ApiDocumentation />} >
      <Route index element={<Introduction />} />
      <Route path="introduction" element={<Introduction/>} />
      <Route path="authontication" element={<Authontication/>} />
      <Route path="shorten_link" element={<ShortenLink/>} />
      <Route path="retriving_matrix" element={<RetrivingMatrix/>} />
      <Route path="redireacting" element={<RedireactingLink/>} />
      <Route path="truboolshoting" element={<TruboolshotingTips/>} />
      </Route>
      
    

      <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
      <Route index element={<PrivateRoute><DashboardHome /></PrivateRoute>} />
        <Route path="home" element={<PrivateRoute><DashboardHome /></PrivateRoute>} />
        <Route path="create-new" element={<PrivateRoute><Createnew /></PrivateRoute>} />
        <Route path="links" element={<PrivateRoute><Links /></PrivateRoute>} />
        <Route path="links/:id" element={<PrivateRoute><Url /></PrivateRoute>} />
        <Route path="analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
        <Route path="api" element={<PrivateRoute><Apiintegration /></PrivateRoute>} />
        <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Route>
    </Routes>
  );
};

export default Allroutes;
