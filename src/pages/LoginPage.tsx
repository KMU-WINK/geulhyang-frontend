import React from "react";
import KakaoLoginButton from "../components/KakaoLoginButton";

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <KakaoLoginButton />
    </div>
  );
}

export default LoginPage;
