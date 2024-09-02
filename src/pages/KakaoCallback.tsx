import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authState } from "../state/authState";

function KakaoCallback() {
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authState);

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_PORT}/auth/kakao`,
            { code },
            {
              withCredentials: true,
            },
          );

          const { token } = response.data;
          const { message } = response.data;

          console.log("콜백 페이지, 토큰:", token);
          console.log("콜백 페이지, 유저 정보 :", message);

          setAuthState({ token, message });

          if (message === "firstLogin") {
            localStorage.setItem("Kakao Token", token);
            console.log("콜백 페이지 : 신규 유저");
            navigate("/firstlogin");
          } else if (message === "existLogin") {
            localStorage.setItem("우리 서버 Token", token);
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
  }, [navigate, setAuthState]);

  return <div />;
}

export default KakaoCallback;
