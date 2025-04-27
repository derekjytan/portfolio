import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaSpotify,
  FaPlayCircle,
  FaServer,
  FaHistory,
  FaPause,
} from "react-icons/fa";

const SPOTIFY_API_URL = "http://127.0.0.1:3000/api/spotify/listening-activity";
const SPOTIFY_RECENT_URL = "http://127.0.0.1:3000/api/spotify/recently-played";
const SPOTIFY_AUTH_URL = "http://127.0.0.1:3000/login";
const SPOTIFY_REFRESH_URL = "http://127.0.0.1:3000/refresh_token";

const SpotifyActivity = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [recentTrack, setRecentTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Reference to store the progress timer
  const progressTimerRef = useRef(null);
  // Reference to store the data refresh timer
  const dataRefreshTimerRef = useRef(null);

  // On initial load, check if we have valid tokens
  useEffect(() => {
    checkAndRefreshToken();

    // Cleanup timers on unmount
    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (dataRefreshTimerRef.current)
        clearInterval(dataRefreshTimerRef.current);
    };
  }, []);

  // Function to check token validity and refresh if needed
  const checkAndRefreshToken = async () => {
    const accessToken = localStorage.getItem("spotify_access_token");
    const refreshToken = localStorage.getItem("spotify_refresh_token");
    const tokenExpiry = localStorage.getItem("spotify_token_expiry");

    // If we have a refresh token and either no access token or it's expired
    if (
      refreshToken &&
      (!accessToken || (tokenExpiry && Date.now() > parseInt(tokenExpiry)))
    ) {
      console.log("Token expired, refreshing...");
      try {
        const response = await fetch(
          `${SPOTIFY_REFRESH_URL}?refresh_token=${refreshToken}`
        );
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("spotify_access_token", data.access_token);
          localStorage.setItem(
            "spotify_token_expiry",
            Date.now() + data.expires_in * 1000
          );
          setIsTokenValid(true);
          fetchSpotifyData(data.access_token);
        } else {
          console.error("Failed to refresh token, redirecting to auth");
          setIsTokenValid(false);
          // We'll show the auth button rather than auto-redirecting
        }
      } catch (err) {
        console.error("Error refreshing token:", err);
        setIsTokenValid(false);
      }
    } else if (
      accessToken &&
      tokenExpiry &&
      Date.now() < parseInt(tokenExpiry)
    ) {
      // We have a valid token
      setIsTokenValid(true);
      fetchSpotifyData(accessToken);
    } else {
      // No valid tokens
      setIsTokenValid(false);
      setLoading(false);
    }
  };

  // Function to fetch recently played track
  const fetchRecentlyPlayed = async (token) => {
    try {
      const accessToken = token || localStorage.getItem("spotify_access_token");

      if (!accessToken) return;

      const response = await fetch(
        `${SPOTIFY_RECENT_URL}?access_token=${accessToken}`
      );

      if (!response.ok) {
        console.error(
          "Failed to fetch recently played track:",
          response.status
        );
        return;
      }

      const data = await response.json();

      if (data.success && data.track) {
        setRecentTrack({
          name: data.track.name,
          artist: data.track.artist,
          album: data.track.album,
          albumImageUrl: data.track.albumArt,
          duration: data.track.duration_ms,
          uri: data.track.url,
          playedAt: new Date(data.track.played_at),
        });
      }
    } catch (err) {
      console.error("Error fetching recently played track:", err);
    }
  };

  // Function to fetch currently playing track
  const fetchSpotifyData = async (token) => {
    try {
      setLoading(true);

      // Use provided token or get from localStorage
      const accessToken = token || localStorage.getItem("spotify_access_token");

      if (!accessToken) {
        console.log("No access token found");
        setError("Authentication required");
        setIsTokenValid(false);
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${SPOTIFY_API_URL}?access_token=${accessToken}`
      );

      if (response.status === 401) {
        // Token is invalid, try to refresh
        console.log("Token invalid, attempting refresh");
        await checkAndRefreshToken();
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch Spotify data: ${response.status}`);
      }

      const data = await response.json();
      console.log("Spotify API response:", data);

      if (data.success) {
        // Update the playing state based on API response
        setIsPlaying(data.isPlaying);

        if (data.track) {
          // Set current progress to what came from the API
          setCurrentProgress(data.progress_ms);

          // Update the track info
          setCurrentTrack({
            name: data.track.name,
            artist: data.track.artist,
            album: data.track.album,
            albumImageUrl: data.track.albumArt,
            progress: data.progress_ms,
            duration: data.track.duration_ms,
            uri: data.track.url,
          });
        } else {
          setCurrentTrack(null);

          // If nothing is playing, fetch recently played
          if (!recentTrack) {
            fetchRecentlyPlayed(accessToken);
          }
        }
        setError(null);
      } else {
        setError(data.error || "Failed to fetch Spotify data");
        setCurrentTrack(null);
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Error fetching Spotify data:", err);
      setError("Unable to load Spotify data");
      setCurrentTrack(null);
      setIsPlaying(false);
    } finally {
      setLoading(false);
    }
  };

  // Setup polling interval
  useEffect(() => {
    if (isTokenValid) {
      // Initial fetch
      fetchSpotifyData();

      // Also fetch recently played on first load
      fetchRecentlyPlayed();

      // Poll for updates every 30 seconds
      dataRefreshTimerRef.current = setInterval(() => {
        fetchSpotifyData();
      }, 30000);

      return () => {
        if (dataRefreshTimerRef.current) {
          clearInterval(dataRefreshTimerRef.current);
        }
      };
    }
  }, [isTokenValid]);

  // Add effect to handle progress timer based on isPlaying state
  useEffect(() => {
    // Clear any existing timer
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }

    // Only set up the timer if a track is currently playing
    if (isPlaying && currentTrack) {
      progressTimerRef.current = setInterval(() => {
        setCurrentProgress((prevProgress) => {
          // If we've reached the end of the track, refresh the data
          if (prevProgress >= currentTrack.duration) {
            fetchSpotifyData();
            return 0;
          }
          // Otherwise increment by 1000ms (1 second)
          return prevProgress + 1000;
        });
      }, 1000);
    }

    // Cleanup on unmount or when isPlaying changes
    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [isPlaying, currentTrack]);

  // Handle manual login flow
  const handleLogin = () => {
    // Redirect to Spotify auth
    window.location.href = SPOTIFY_AUTH_URL;
  };

  // Extract URL params on load (for when returning from auth)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const expiresIn = params.get("expires_in");

    // If we have tokens in the URL, save them
    if (accessToken && refreshToken) {
      localStorage.setItem("spotify_access_token", accessToken);
      localStorage.setItem("spotify_refresh_token", refreshToken);
      localStorage.setItem(
        "spotify_token_expiry",
        Date.now() + parseInt(expiresIn) * 1000
      );

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);

      setIsTokenValid(true);
      fetchSpotifyData(accessToken);
      fetchRecentlyPlayed(accessToken);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!isTokenValid || error) {
    return (
      <div className="rounded-xl bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <FaSpotify className="text-green-500 text-2xl mr-2" />
          <h3 className="text-xl font-bold">My Spotify Activity</h3>
        </div>
        <div className="text-center py-4 text-gray-500 dark:text-gray-400 flex flex-col items-center">
          <FaServer className="text-3xl mb-2" />
          <p>{error || "Spotify authentication required"}</p>
          <button
            onClick={handleLogin}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            Connect with Spotify
          </button>
        </div>
      </div>
    );
  }

  // Calculate progress percentage based on the real-time progress
  const progressPercentage =
    currentTrack?.duration > 0
      ? (currentProgress / currentTrack.duration) * 100
      : 0;

  // Format relative time for recently played track
  const formatRelativeTime = (date) => {
    if (!date) return "";

    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);

    if (diffMin < 1) return "Just now";
    if (diffMin === 1) return "1 minute ago";
    if (diffMin < 60) return `${diffMin} minutes ago`;

    const diffHours = Math.floor(diffMin / 60);
    if (diffHours === 1) return "1 hour ago";
    if (diffHours < 24) return `${diffHours} hours ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FaSpotify className="text-green-500 text-2xl mr-2" />
          <h3 className="text-xl font-bold">My Spotify Activity</h3>
        </div>
        <button
          onClick={() => {
            fetchSpotifyData();
            fetchRecentlyPlayed();
          }}
          className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Refresh
        </button>
      </div>

      {currentTrack ? (
        // Currently playing track
        <div className="mb-2">
          <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2 flex items-center">
            {isPlaying ? (
              <>
                <FaPlayCircle className="mr-1 text-green-500" />
                Now Playing
              </>
            ) : (
              <>
                <FaPause className="mr-1 text-yellow-500" />
                Paused
              </>
            )}
          </div>
          <div className="flex items-center">
            <div className="w-16 h-16 flex-shrink-0 mr-4">
              <img
                src={
                  currentTrack.albumImageUrl || "https://via.placeholder.com/64"
                }
                alt={currentTrack.album || "Album cover"}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex-1">
              <a
                href={currentTrack.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-800 dark:text-white hover:text-green-500 dark:hover:text-green-400 transition-colors"
              >
                {currentTrack.name}
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {currentTrack.artist}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentTrack.album}
              </p>

              {/* Progress bar */}
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className={`${
                    isPlaying ? "bg-green-500" : "bg-yellow-500"
                  } h-1.5 rounded-full transition-all duration-1000 ease-linear`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Timestamps */}
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>{formatTime(currentProgress)}</span>
                <span>{formatTime(currentTrack.duration)}</span>
              </div>
            </div>
          </div>
        </div>
      ) : recentTrack ? (
        // Recently played track
        <div className="mb-2">
          <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2 flex items-center">
            <FaHistory className="mr-1 text-gray-400" />
            Last Played {formatRelativeTime(recentTrack.playedAt)}
          </div>
          <div className="flex items-center">
            <div className="w-16 h-16 flex-shrink-0 mr-4">
              <img
                src={
                  recentTrack.albumImageUrl || "https://via.placeholder.com/64"
                }
                alt={recentTrack.album || "Album cover"}
                className="w-full h-full object-cover rounded-md opacity-75"
              />
            </div>
            <div className="flex-1">
              <a
                href={recentTrack.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors"
              >
                {recentTrack.name}
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {recentTrack.artist}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {recentTrack.album}
              </p>

              {/* Time played info */}
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 italic">
                {recentTrack.playedAt
                  ? recentTrack.playedAt.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // No track information
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <p>No recent Spotify activity</p>
          <button
            onClick={() => fetchRecentlyPlayed()}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      )}
    </motion.div>
  );
};

// Helper function to format milliseconds as mm:ss
function formatTime(ms) {
  if (!ms) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default SpotifyActivity;
