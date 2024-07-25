require("dotenv").config(); // .env 파일의 환경 변수를 로드

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/auth/kakao", async (req, res) => {
  const { code } = req.body;

  console.log("Received authorization code:", code);

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
    console.log(tokenResponse.data);
    res.json({ access_token });
  } catch (error) {
    console.error(
      "Error fetching access token:",
      error.response ? error.response.data : error.message,
    );
    res.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 4000}`);
});
