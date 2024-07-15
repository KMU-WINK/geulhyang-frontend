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

          const accessToken = response.data.access_token;
          localStorage.setItem("kakaoAccessToken", accessToken);
          localStorage.setItem("kakaoAuthCode", code);
          navigate("/success");
        } catch (error) {
          navigate("/login");
        }
      } else {
        console.error("Authorization code not found.");
        navigate("/login");
      }
    };

    handleAuth();
  }, [navigate]);

  return <div>Loading...</div>;
}

export default KakaoCallback;
