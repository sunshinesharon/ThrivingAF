import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import VerificationPage from "./components/VerificationPage";
import "./App.scss";

import Login from "./pages/login/Login";
import Question from "./pages/question/Question";
import Header from "./components/Header";
import ResponsePage from "./pages/response/ResponsePage";
import Pricing from "./pages/pricing/Pricing";
import WhyThriving from "./pages/why-thriving/WhyThriving";
import FreelancerHub from "./pages/freelancer-hub/FreelancerHub";
import ContactPage from "./pages/contact/ContactPage";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Login />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/question" element={<Question />} />
        <Route path="/response" element={<ResponsePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/freelance-hub" element={<FreelancerHub />} />
        <Route path="/why-thriving" element={<WhyThriving />} />
      </Routes>
    </Router>
  );
};

export default App;
