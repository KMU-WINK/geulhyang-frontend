import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SuccessPage from "./pages/SuccessPage";
import KakaoCallback from "./pages/KakaoCallback";
import FirstLoginPage from "./pages/FirstLoginPage";
import "./styles/tailwind.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/firstlogin" element={<FirstLoginPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
