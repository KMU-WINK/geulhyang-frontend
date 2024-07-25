import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("kakaoToken");

    console.log("토큰 :", storedToken);

    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error("성공 페이지, 에러 : 토큰 없음.");
      navigate("/login");
    }
  }, [navigate]);

  const handleKakaoLogout = () => {
    localStorage.removeItem("kakaoToken");
    navigate("/login");
    console.log("로그아웃 완료");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-2">카카오 로그인 성공</h1>
      {token ? (
        <div className="text-center mb-4">
          <p className="mt-2">저장된 토큰 : {token}</p>
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
