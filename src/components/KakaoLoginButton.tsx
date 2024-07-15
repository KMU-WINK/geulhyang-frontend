import React, { useEffect, useState } from "react";

const KAKAO_JS_KEY = process.env.REACT_APP_KAKAO_JS_KEY;
const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URI}/auth/kakao/callback`;

function KakaoLoginButton() {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
        setIsKakaoInitialized(true);
        console.log("Kakao SDK 초기화 완료");
      } else {
        setIsKakaoInitialized(true);
        console.log("Kakao SDK 이미 초기화됨");
      }
    } else {
      console.error("Kakao 객체를 찾을 수 없습니다.");
    }
  }, []);

  const handleKakaoLogin = () => {
    if (!isKakaoInitialized) {
      console.error("Kakao SDK가 초기화되지 않았습니다.");
      return;
    }
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.authorize({
        redirectUri: REDIRECT_URI,
      });
    } else {
      console.error("Kakao.Auth 객체를 찾을 수 없습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-2">카카오 로그인 테스트</h1>
      <button
        type="button"
        onClick={handleKakaoLogin}
        className="mt-2 bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        카카오 로그인
      </button>
    </div>
  );
}

export default KakaoLoginButton;
