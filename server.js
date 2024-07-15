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
    res.json({ access_token });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
