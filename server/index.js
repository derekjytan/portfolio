import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import querystring from "querystring";
import https from "https";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Spotify API credentials
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
// const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

// Get Spotify access token
const getAccessToken = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      data: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Spotify access token:", error);
    throw error;
  }
};

// Get current playing track
const getCurrentTrack = async (accessToken) => {
  try {
    const response = await axios({
      method: "get",
      url: "https://api.spotify.com/v1/me/player/currently-playing",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // If no track is playing (204 No Content)
    if (response.status === 204) {
      return null;
    }

    const data = response.data;

    if (!data.item) {
      return null;
    }

    return {
      name: data.item.name,
      artist: data.item.artists.map((artist) => artist.name).join(", "),
      album: data.item.album.name,
      albumImageUrl: data.item.album.images[0]?.url,
      isPlaying: data.is_playing,
    };
  } catch (error) {
    console.error("Error getting current track:", error);
    return null;
  }
};

// Get recently played tracks
const getRecentlyPlayed = async (accessToken) => {
  try {
    const response = await axios({
      method: "get",
      url: "https://api.spotify.com/v1/me/player/recently-played?limit=5",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const tracks = response.data.items.map((item) => ({
      name: item.track.name,
      artist: item.track.artists.map((artist) => artist.name).join(", "),
      album: item.track.album.name,
      albumImageUrl: item.track.album.images[0]?.url,
      playedAt: item.played_at,
    }));

    return tracks;
  } catch (error) {
    console.error("Error getting recently played tracks:", error);
    return [];
  }
};

// Spotify API endpoint
app.get("/api/spotify", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const currentTrack = await getCurrentTrack(accessToken);
    const recentTracks = await getRecentlyPlayed(accessToken);

    res.json({
      isPlaying: currentTrack?.isPlaying || false,
      currentTrack,
      recentTracks,
    });
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    res.status(500).json({ error: "Failed to fetch Spotify data" });
  }
});

// Start the server with HTTPS
try {
  // Generate self-signed certificate for development
  // In production, you would use proper certificates
  const options = {
    key: fs.readFileSync(
      process.env.SSL_KEY_PATH || path.resolve("server/cert/key.pem")
    ),
    cert: fs.readFileSync(
      process.env.SSL_CERT_PATH || path.resolve("server/cert/cert.pem")
    ),
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("Error starting HTTPS server:", error.message);
  console.log("Falling back to HTTP server...");

  // Fallback to HTTP if certificates are not available
  app.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
  });
}
