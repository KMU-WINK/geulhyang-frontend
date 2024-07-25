import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        try {
          const response = await axios.post(
            "http://localhost:4000/auth/kakao",
            { code },
          );

          const { token } = response.data;
          const { firstLogin } = response.data.message;
          console.log("콜백 페이지, 토큰:", token);
          console.log("콜백 페이지, 유저 정보 :", firstLogin);

          localStorage.setItem("kakaoToken", token);

          if (firstLogin) {
            console.log("콜백 페이지 : 신규 유저");
            navigate("/firstlogin");
          } else {
            console.log("콜백 페이지 : 기존 유저");
            navigate("/success");
          }
        } catch (error) {
          console.error("콜백 페이지, 에러 : ", error);
          navigate("/login");
        }
      } else {
        console.error("콜백 페이지, 에러 : 인가 코드 없음");
        navigate("/login");
      }
    };

    handleAuth();
  }, [navigate]);

  return <div />;
}

export default KakaoCallback;
