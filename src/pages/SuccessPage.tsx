import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authCode, setAuthCode] = useState<string | null>(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("kakaoAccessToken");
    const storedAuthCode = localStorage.getItem("kakaoAuthCode");

    console.log("Stored authorization code:", storedAuthCode);

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    } else {
      console.error("No access token available.");
      navigate("/login");
    }

    if (storedAuthCode) {
      setAuthCode(storedAuthCode);
    } else {
      console.error("No authorization code available.");
      navigate("/login");
    }
  }, [navigate]);

  const handleKakaoLogout = () => {
    localStorage.removeItem("kakaoAccessToken");
    localStorage.removeItem("kakaoAuthCode");
    navigate("/login");
    console.log("로그아웃 완료");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-2">카카오 로그인 성공</h1>
      {accessToken && authCode ? (
        <div className="text-center mb-4">
          <p className="mt-2">토큰 저장 완료 : {authCode}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button
        type="button"
        onClick={handleKakaoLogout}
        className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        로그아웃
      </button>
    </div>
  );
}

export default SuccessPage;
