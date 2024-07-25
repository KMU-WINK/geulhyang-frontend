import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FirstLoginPage() {
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("kakaoToken");

    try {
      await axios.post(
        "http://localhost:4000/profile-setup",
        { nickname, gender, age },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
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
        <input
          type="text"
          placeholder="성별"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
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
