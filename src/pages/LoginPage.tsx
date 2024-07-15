import React from "react";
import KakaoLoginButton from "../components/KakaoLoginButton";

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* 간격을 조정하기 위해 mb-2 추가 */}
      <KakaoLoginButton />
    </div>
  );
}

export default LoginPage;
