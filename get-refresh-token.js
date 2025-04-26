import express from "express";
import dotenv from "dotenv";
import querystring from "querystring";
import https from "https";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const PORT = 8000;
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "https://localhost:8000/callback";

// Step 1: Get authorization code
app.get("/login", (req, res) => {
  const scope = "user-read-currently-playing user-read-recently-played";

  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
    })}`
  );
});

// Step 2: Exchange authorization code for tokens
app.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: querystring.stringify({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const data = await response.json();

    if (data.error) {
      res.send(`
        <h1>Authentication Error</h1>
        <p>Error: ${data.error}</p>
        <p>Description: ${
          data.error_description || "No description provided"
        }</p>
        <p>Make sure your Spotify app's redirect URI exactly matches: ${REDIRECT_URI}</p>
      `);
      return;
    }

    res.send(`
      <h1>Authentication Successful!</h1>
      <p>Your refresh token is:</p>
      <pre>${data.refresh_token}</pre>
      <p>Copy this token and add it to your .env file as SPOTIFY_REFRESH_TOKEN</p>
    `);
  } catch (error) {
    console.error("Token exchange error:", error);
    res.status(500).send(`Error: ${error.message}`);
  }
});

// Create the cert directory if it doesn't exist
const certDir = path.join(process.cwd(), "server", "cert");
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
}

// Check if certificates exist, if not, generate them
if (
  !fs.existsSync(path.join(certDir, "key.pem")) ||
  !fs.existsSync(path.join(certDir, "cert.pem"))
) {
  console.log("Certificates not found. Please generate them first with:");
  console.log("node generate-cert.js");
  process.exit(1);
}

// Start the HTTPS server with certificates
const httpsOptions = {
  key: fs.readFileSync(path.join(certDir, "key.pem")),
  cert: fs.readFileSync(path.join(certDir, "cert.pem")),
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
