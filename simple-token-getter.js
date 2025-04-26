import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = 8888;
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://localhost:8888/callback";

// Generate a random string for the state parameter
const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString("hex");
};

// Generate code verifier and challenge for PKCE
const generateCodeVerifier = () => {
  return generateRandomString(64);
};

const generateCodeChallenge = async (verifier) => {
  const digest = crypto.createHash("sha256").update(verifier).digest("base64");
  return digest.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

// Store code verifier globally
let codeVerifier = "";

app.get("/login", async (req, res) => {
  codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateRandomString(16);
  const scope = "user-read-currently-playing user-read-recently-played";

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    state: state,
    scope: scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.send("State mismatch error");
    return;
  }

  try {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await response.json();

    if (data.error) {
      res.send(`
        <h1>Authentication Error</h1>
        <p>Error: ${data.error}</p>
        <p>Description: ${
          data.error_description || "No description provided"
        }</p>
      `);
      return;
    }

    res.send(`
      <h1>Authentication Successful!</h1>
      <p>Your refresh token is:</p>
      <pre>${data.refresh_token}</pre>
      <p>Copy this token and add it to your .env file as SPOTIFY_REFRESH_TOKEN</p>
      <p>Your access token (expires in 1 hour):</p>
      <pre>${data.access_token}</pre>
    `);
  } catch (error) {
    console.error("Token exchange error:", error);
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Go to http://localhost:${PORT}/login to authenticate`);
});
