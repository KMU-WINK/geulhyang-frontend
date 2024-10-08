import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import KakaoLoginButton from "./components/KakaoLoginButton";
import KakaoCallback from "./pages/KakaoCallback";
import FirstLoginPage from "./pages/FirstLoginPage";
import SuccessPage from "./pages/SuccessPage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<KakaoLoginButton />} />
          <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
          <Route path="/firstlogin" element={<FirstLoginPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
