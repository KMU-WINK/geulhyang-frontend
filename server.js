require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = []; // In-memory 사용자 저장소

app.post("/auth/kakao", async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_CLIENT_ID,
          redirect_uri: `${process.env.REACT_APP_REDIRECT_URI}/auth/kakao/callback`,
          code,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const { access_token } = tokenResponse.data;

    const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const kakaoId = userResponse.data.id;
    let user = users.find((user) => user.kakaoId === kakaoId);

    let firstLogin = false;

    if (!user) {
      user = { kakaoId, firstLogin: true };
      firstLogin = true;
      users.push(user);
    } else {
      firstLogin = user.firstLogin;
    }

    // 디버깅 출력
    console.log("User object:", user);
    console.log("First login value:", firstLogin);

    // 응답 데이터 반환
    const responseData = { token: access_token, message: { firstLogin } };
    console.log("Returning response:", responseData);

    res.json(responseData);
  } catch (error) {
    console.error(
      "Error during authentication:",
      error.response ? error.response.data : error.message,
    );
    res.status(500).send("Internal Server Error");
  }
});

app.post("/profile-setup", async (req, res) => {
  const { nickname, gender, age } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  try {
    const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const kakaoId = userResponse.data.id;
    const user = users.find((user) => user.kakaoId === kakaoId);

    if (user) {
      user.nickname = nickname;
      user.gender = gender;
      user.age = age;
      user.firstLogin = false;
      res.sendStatus(200);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response ? error.response.data : error.message,
    );
    res.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 4000}`);
});
