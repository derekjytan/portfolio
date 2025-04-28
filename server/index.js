import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import querystring from "querystring";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration for frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Spotify API credentials
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

// Login endpoint
app.get("/login", (req, res) => {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-recently-played",
    "user-top-read",
  ];
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope: scopes.join(" "),
        redirect_uri: "http://127.0.0.1:3000",
      })
  );
});

// Callback endpoint
app.get("/", async (req, res) => {
  const code = req.query.code || null;

  // Get the referrer domain or use a default frontend URL
  const frontendUrl = req.headers.referer
    ? new URL(req.headers.referer).origin
    : "http://localhost:5173";

  if (!code) {
    return res.redirect(
      "/#" +
        querystring.stringify({
          error: "invalid_token",
        })
    );
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
            "base64"
          ),
      },
      body: querystring.stringify({
        code: code,
        redirect_uri: "http://127.0.0.1:3000",
        grant_type: "authorization_code",
      }),
    });

    const data = await response.json();
    const { access_token, refresh_token, expires_in } = data;

    return res.redirect(
      `${frontendUrl}?access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`
    );
  } catch (error) {
    console.error("Error getting tokens:", error);
  }
});

// Endpoint to refresh access token
app.get("/refresh_token", async (req, res) => {
  const refresh_token = req.query.refresh_token;
  console.log("Refresh token:", refresh_token);

  if (!refresh_token) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
            "base64"
          ),
      },
      body: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: "Failed to refresh token" });
  }
});

// Endpoint to get top artists
app.get("/api/spotify/top-artists", async (req, res) => {
  try {
    // Load environment variables for your Spotify user credentials
    const userRefreshToken = process.env.MY_SPOTIFY_REFRESH_TOKEN;

    if (!userRefreshToken) {
      return res.status(500).json({
        success: false,
        error: "Server not configured with user refresh token",
      });
    }

    // Get a fresh access token using your refresh token
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
        },
        body: querystring.stringify({
          grant_type: "refresh_token",
          refresh_token: userRefreshToken,
        }),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error(`Failed to refresh token: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    const userAccessToken = tokenData.access_token;

    // Use this token to get your top artists
    const response = await fetch(
      "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5",
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      }
    );

    // console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to get top artists: ${response.status}`);
    }

    const data = await response.json();

    console.log("Top artists:", data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching top artists:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch top artists",
      message: error.message,
    });
  }
});

// Endpoint to get recently played tracks
app.get("/api/spotify/recently-played", async (req, res) => {
  const access_token = req.query.access_token;

  if (!access_token) {
    return res.status(401).json({ error: "Access token is required" });
  }

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      console.log(`Response not OK (${response.status})`);
      throw new Error(`Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return res.json({
        success: true,
        recentTracks: [],
      });
    }

    // Get the most recent track
    const recentTrack = data.items[0];

    const formattedResponse = {
      success: true,
      track: {
        name: recentTrack.track.name,
        artist: recentTrack.track.artists
          .map((artist) => artist.name)
          .join(", "),
        album: recentTrack.track.album.name,
        albumArt: recentTrack.track.album.images[0]?.url,
        duration_ms: recentTrack.track.duration_ms,
        url: recentTrack.track.external_urls.spotify,
        played_at: recentTrack.played_at,
      },
    };

    res.json(formattedResponse);
  } catch (error) {
    console.error("Error fetching recently played tracks:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch recently played tracks",
      message: error.message,
    });
  }
});

// Endpoint to get listening activity
app.get("/api/spotify/listening-activity", async (req, res) => {
  const access_token = req.query.access_token;

  if (!access_token) {
    return res.status(401).json({ error: "Access token is required" });
  }

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing?market=CA",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      console.log(`Response not OK (${response.status})`);
      throw new Error(`Status: ${response.status}`);
    }

    const data = await response.json();

    // console.log("Full Spotify API response:", JSON.stringify(data, null, 2));

    // Format the response
    const formattedResponse = {
      success: true,
      isPlaying: data.is_playing,
      progress_ms: data.progress_ms,
      timestamp: data.timestamp,
      currentlyPlayingType: data.currently_playing_type,
    };

    // Add track info
    // console.log("Data:", data);
    if (data.item) {
      // console.log("Track info available, adding to response");
      formattedResponse.track = {
        name: data.item.name,
        artist: data.item.artists
          ? data.item.artists.map((artist) => artist.name).join(", ")
          : null,
        album: data.item.album ? data.item.album.name : null,
        albumArt:
          data.item.album && data.item.album.images.length > 0
            ? data.item.album.images[0].url
            : null,
        duration_ms: data.item.duration_ms,
        url: data.item.external_urls ? data.item.external_urls.spotify : null,
      };
    } else {
      console.log("No track info in response");
    }

    // Add context if available
    if (data.context) {
      // console.log("Context info available, adding to response");
      formattedResponse.context = {
        type: data.context.type,
        uri: data.context.uri,
        url: data.context.external_urls
          ? data.context.external_urls.spotify
          : null,
      };
    }

    // console.log("Sending formatted response");
    res.json(formattedResponse);
  } catch (error) {
    console.error("Error fetching listening activity:", error);
    // Include the actual error message in the response
    res.status(500).json({
      success: false,
      error: "Failed to fetch listening activity",
      message: error.message,
    });
  }
});

// Get my activity
app.get("/api/spotify/my-activity", async (req, res) => {
  try {
    // Load environment variables for your Spotify user credentials
    const userRefreshToken = process.env.MY_SPOTIFY_REFRESH_TOKEN;

    if (!userRefreshToken) {
      return res.status(500).json({
        success: false,
        error: "Server not configured with user refresh token",
      });
    }

    // Get a fresh access token using your refresh token
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
        },
        body: querystring.stringify({
          grant_type: "refresh_token",
          refresh_token: userRefreshToken,
        }),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error(`Failed to refresh token: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    const userAccessToken = tokenData.access_token;

    // Now use this token to get your currently playing track
    const currentlyPlayingResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing?market=CA",
      {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
        },
      }
    );

    // Check if there is currently playing content
    if (currentlyPlayingResponse.status === 204) {
      // No content, try recently played
      const recentlyPlayedResponse = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
          },
        }
      );

      if (!recentlyPlayedResponse.ok) {
        throw new Error(
          `Failed to get recently played: ${recentlyPlayedResponse.status}`
        );
      }

      const recentData = await recentlyPlayedResponse.json();

      if (!recentData.items || recentData.items.length === 0) {
        return res.json({
          success: true,
          isPlaying: false,
          hasRecentTrack: false,
        });
      }

      // Return the most recent track
      const recentTrack = recentData.items[0];
      return res.json({
        success: true,
        isPlaying: false,
        hasRecentTrack: true,
        recentTrack: {
          name: recentTrack.track.name,
          artist: recentTrack.track.artists
            .map((artist) => artist.name)
            .join(", "),
          album: recentTrack.track.album.name,
          albumArt: recentTrack.track.album.images[0]?.url,
          duration_ms: recentTrack.track.duration_ms,
          url: recentTrack.track.external_urls.spotify,
          played_at: recentTrack.played_at,
        },
      });
    } else if (currentlyPlayingResponse.ok) {
      // We have currently playing content
      const currentData = await currentlyPlayingResponse.json();

      return res.json({
        success: true,
        isPlaying: currentData.is_playing,
        hasRecentTrack: false,
        currentTrack: {
          name: currentData.item.name,
          artist: currentData.item.artists
            .map((artist) => artist.name)
            .join(", "),
          album: currentData.item.album.name,
          albumArt: currentData.item.album.images[0]?.url,
          duration_ms: currentData.item.duration_ms,
          progress_ms: currentData.progress_ms,
          url: currentData.item.external_urls.spotify,
        },
      });
    } else {
      throw new Error(
        `Failed to get currently playing: ${currentlyPlayingResponse.status}`
      );
    }
  } catch (error) {
    console.error("Error in public Spotify endpoint:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve Spotify data",
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`- Login URL: http://127.0.0.1:${PORT}/login`);
});
