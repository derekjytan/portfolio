import fetch from "node-fetch";

// Environment variables are automatically loaded from your Vercel project settings
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const MY_SPOTIFY_REFRESH_TOKEN = process.env.MY_SPOTIFY_REFRESH_TOKEN;

export default async function handler(req, res) {
  try {
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
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: MY_SPOTIFY_REFRESH_TOKEN,
        }),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error(`Failed to refresh token: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    const userAccessToken = tokenData.access_token;

    // Check if we want top artists
    if (req.query.type === "top-artists") {
      const topArtistsResponse = await fetch(
        "https://api.spotify.com/v1/me/top/artists?limit=5&time_range=short_term",
        {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
          },
        }
      );

      if (!topArtistsResponse.ok) {
        throw new Error(
          `Failed to fetch top artists: ${topArtistsResponse.status}`
        );
      }

      const topArtistsData = await topArtistsResponse.json();
      return res.status(200).json({
        success: true,
        items: topArtistsData.items,
      });
    } else if (req.query.type === "top-tracks") {
      const topTracksResponse = await fetch(
        "https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term",
        {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
          },
        }
      );

      if (!topTracksResponse.ok) {
        throw new Error(
          `Failed to fetch top tracks: ${topTracksResponse.status}`
        );
      }

      const topTracksData = await topTracksResponse.json();
      return res.status(200).json({
        success: true,
        items: topTracksData.items,
      });
    }

    // Now use this token to get currently playing track
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
        return res.status(200).json({
          success: true,
          isPlaying: false,
          hasRecentTrack: false,
        });
      }

      // Return the most recent track
      const recentTrack = recentData.items[0];
      return res.status(200).json({
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

      return res.status(200).json({
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
    console.error("Error in Spotify API route:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve Spotify data",
      message: error.message,
    });
  }
}
