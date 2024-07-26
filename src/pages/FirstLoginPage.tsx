import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../state/authState";

function FirstLoginPage() {
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (!auth.token) {
      console.error("첫 로그인 페이지, 에러: 토큰 없음");
      navigate("/login");
    }
  }, [auth.token, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT}/register`,
        {
          nickname,
          gender,
          age,
          code: auth.token,
        },
      );

      const { token } = response.data;
      localStorage.setItem("우리 서버 Token", token);

      navigate("/success");
    } catch (error) {
      console.error("첫 로그인 페이지, 에러 :", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-2">프로필 설정</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <div className="mb-2">
          <label className="mr-4">
            <input
              type="checkbox"
              value="Male"
              checked={gender === "Male"}
              onChange={() => setGender(gender === "Male" ? "" : "Male")}
              className="mr-2"
            />
            남자
          </label>
          <label>
            <input
              type="checkbox"
              value="Female"
              checked={gender === "Female"}
              onChange={() => setGender(gender === "Female" ? "" : "Female")}
              className="mr-2"
            />
            여자
          </label>
        </div>
        <input
          type="text"
          placeholder="나이"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          설정 완료
        </button>
      </form>
    </div>
  );
}

export default FirstLoginPage;
