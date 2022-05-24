import React from 'react';
import "./App.css";
import AdminRegister from "./components/admin/AdminRegister";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import {Routes, Route, Navigate} from 'react-router-dom';
import Homepage from './components/admin/Homepage';
import VendorLogin from './components/vendors/VendorLogin';
import VendorDashboard from './components/vendors/VendorDashboard';

const App = () => {

  return (
    
      <Routes>
            <Route path='/' exact element={<Homepage/>} />
            <Route path="/admin/register" exact element={<AdminRegister/>} />
            <Route path="/admin/login" exact element={<AdminLogin />} />
            <Route path="/admin/dashboard" exact element={<AdminDashboard/>} />
            <Route path="/vendor/login" exact element={<VendorLogin />} />
            <Route path="/vendor/dashboard" exact element={<VendorDashboard />} />
      </Routes>
   
  );
}

export default App;
