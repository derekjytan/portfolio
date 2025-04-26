# Spotify Integration Setup

This document explains how to set up the Spotify integration for your portfolio website.

## Prerequisites

- A Spotify account
- Node.js and npm installed
- OpenSSL for generating certificates (usually pre-installed on macOS and Linux, Windows users may need to install it separately)

## Steps to Set Up

### 1. Create a Spotify Developer App

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and log in with your Spotify account.
2. Click "Create App" and fill in the details:
   - App name: Your Portfolio
   - App description: Personal portfolio website with Spotify integration
   - Redirect URI: `https://localhost:5000/callback`
   - Website: Your portfolio website URL (if deployed)
3. Once created, you'll receive a Client ID and Client Secret.

### 2. Generate SSL Certificates

Since we're using HTTPS locally, you need to generate self-signed certificates:

```
npm run generate-cert
```

This script will create the necessary SSL certificates in the `server/cert` directory.

### 3. Get a Refresh Token

To get a refresh token, you'll need to authenticate with Spotify once. Here's a simple way:

1. Create a file named `get-refresh-token.js` in the root directory:

```javascript
import express from "express";
import dotenv from "dotenv";
import querystring from "querystring";

dotenv.config();

const app = express();
const PORT = 5000;
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "https://localhost:5000/callback";

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

    res.send(`
      <h1>Authentication Successful!</h1>
      <p>Your refresh token is:</p>
      <pre>${data.refresh_token}</pre>
      <p>Copy this token and add it to your .env file as SPOTIFY_REFRESH_TOKEN</p>
    `);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Go to http://localhost:${PORT}/login to authenticate`);
});
```

2. Create a `.env` file with your Spotify Client ID and Secret:

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

3. Run the script with `node get-refresh-token.js`
4. Visit `http://localhost:5000/login` and follow the authentication process
5. Copy the refresh token that's displayed and add it to your `.env` file

### 4. Set Up Your Environment

1. Copy the `.env.example` file to `.env`:

```
cp .env.example .env
```

2. Fill in your Spotify credentials in the `.env` file:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
PORT=5000
SSL_KEY_PATH=server/cert/key.pem
SSL_CERT_PATH=server/cert/cert.pem
```

### 5. Run the Application

Run both the frontend and backend together with HTTPS support:

```
npm run setup-https
```

This will:

1. Generate SSL certificates if they don't exist
2. Start your Vite React app at http://localhost:5173 (or another port if configured differently)
3. Start the Spotify API server at https://localhost:5000

**Note**: Since we're using self-signed certificates, your browser will show a security warning when accessing the app. You'll need to click "Advanced" and "Proceed" (or equivalent) to access the application.

## Understanding the Implementation

### Backend

- The server authenticates with Spotify using your credentials
- It provides an API endpoint at `/api/spotify` that returns:
  - Your current playing track (if any)
  - Your recently played tracks

### Frontend

- The SpotifyActivity component fetches data from your backend
- It displays your currently playing track and recently played tracks
- It updates every minute to keep the information fresh

## Deployment Considerations

When deploying to production:

1. You'll need to deploy both your frontend and the backend server
2. Make sure to set environment variables in your hosting platform
3. Update the `SPOTIFY_API_URL` in `SpotifyActivity.jsx` to point to your deployed backend URL

## Troubleshooting

- If you see "Server might be offline" error, make sure your backend server is running
- If Spotify data isn't updating, your refresh token might have expired - generate a new one
- Check server logs for any API errors from Spotify

## Privacy Note

This integration displays your actual Spotify listening activity. If you want to limit what's shown publicly, consider modifying the backend to filter certain tracks or implement a privacy mode.
