import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./LoginPage";
import SignupPageCustomer from "./CustomerSignup";
import SignupPageVendor from "./VendorSignup";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/customer-signup" element={<SignupPageCustomer />} />
        <Route path="/vendor-signup" element={<SignupPageVendor />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
