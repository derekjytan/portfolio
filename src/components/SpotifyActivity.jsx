import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaSpotify,
  FaPlayCircle,
  FaServer,
  FaHistory,
  FaPause,
} from "react-icons/fa";

const PUBLIC_SPOTIFY_API_URL = "/api/spotify";
// const SPOTIFY_API_URL = "http://127.0.0.1:3000/api/spotify/listening-activity";
// const SPOTIFY_RECENT_URL = "http://127.0.0.1:3000/api/spotify/recently-played";
// const SPOTIFY_AUTH_URL = "http://127.0.0.1:3000/login";
// const SPOTIFY_REFRESH_URL = "http://127.0.0.1:3000/refresh_token";

const SpotifyActivity = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [recentTrack, setRecentTrack] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Reference to store the progress timer
  const progressTimerRef = useRef(null);
  // Reference to store the data refresh timer
  const dataRefreshTimerRef = useRef(null);
  const isMounted = useRef(true);

  // On initial load, fetch data immediately
  useEffect(() => {
    fetchSpotifyData(true);

    // Cleanup timers on unmount
    return () => {
      isMounted.current = false;
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (dataRefreshTimerRef.current)
        clearInterval(dataRefreshTimerRef.current);
    };
  }, []);

  // Function to fetch Spotify data using the public endpoint
  const fetchSpotifyData = async (isInitialFetch = false) => {
    try {
      if (isInitialFetch) {
        setInitialLoading(true);
      }
      // console.log("Fetching from:", PUBLIC_SPOTIFY_API_URL);

      const response = await fetch(PUBLIC_SPOTIFY_API_URL);
      // console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Response error:", errorText);
        throw new Error(
          `Failed to fetch Spotify data: ${response.status}, Details: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Spotify API response:", data);

      if (!isMounted.current) return;

      if (data.success) {
        // Update the playing state
        setIsPlaying(data.isPlaying);

        if (data.currentTrack) {
          // We have currently playing track data
          setCurrentProgress(data.currentTrack.progress_ms);

          // Update the track info
          setCurrentTrack({
            name: data.currentTrack.name,
            artist: data.currentTrack.artist,
            album: data.currentTrack.album,
            albumImageUrl: data.currentTrack.albumArt,
            progress: data.currentTrack.progress_ms,
            duration: data.currentTrack.duration_ms,
            uri: data.currentTrack.url,
          });
        } else if (data.hasRecentTrack && data.recentTrack) {
          // No current track, but we have a recent track
          setCurrentTrack(null);
          setRecentTrack({
            name: data.recentTrack.name,
            artist: data.recentTrack.artist,
            album: data.recentTrack.album,
            albumImageUrl: data.recentTrack.albumArt,
            duration: data.recentTrack.duration_ms,
            uri: data.recentTrack.url,
            playedAt: new Date(data.recentTrack.played_at),
            relativeTime: data.recentTrack.relative_time,
          });
        } else {
          // No current or recent track data
          setCurrentTrack(null);
          setRecentTrack(null);
        }
        setError(null);
      } else {
        setError(data.error || "Failed to fetch Spotify data");
        setCurrentTrack(null);
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Error fetching Spotify data:", err);
      if (isMounted.current) {
        setError(`Unable to load Spotify data: ${err.message}`);
        setCurrentTrack(null);
        setIsPlaying(false);
      }
    } finally {
      if (isInitialFetch && isMounted.current) {
        setInitialLoading(false);
      }
    }
  };

  // Setup polling interval
  useEffect(() => {
    // Initial fetch already done in first useEffect

    // Poll for updates every 10 seconds
    dataRefreshTimerRef.current = setInterval(() => {
      fetchSpotifyData(false);
    }, 10000);

    return () => {
      if (dataRefreshTimerRef.current) {
        clearInterval(dataRefreshTimerRef.current);
      }
    };
  }, []);

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
            fetchSpotifyData(false);
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

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <FaSpotify className="text-green-500 text-2xl mr-2" />
          <h3 className="text-xl font-bold">My Spotify Activity</h3>
        </div>
        <div className="text-center py-4 text-gray-500 dark:text-gray-400 flex flex-col items-center">
          <FaServer className="text-3xl mb-2" />
          <p>{error}</p>
          <button
            onClick={() => fetchSpotifyData(true)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            Try Again
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg p-5 border border-white/20 dark:border-gray-700/50"
    >
      {currentTrack ? (
        // Currently playing track
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-2">
              <FaSpotify className="text-green-500 text-xl" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {isPlaying ? "Now Playing" : "Paused"}
              </span>
            </div>
            {isPlaying && (
              <div className="flex gap-1">
                {[1, 2, 3].map((bar) => (
                  <motion.div
                    key={bar}
                    animate={{
                      height: [8, 16, 8],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: bar * 0.1,
                    }}
                    className="w-1 bg-green-500 rounded-full"
                  />
                ))}
              </div>
            )}
          </motion.div>

          <div className="flex gap-4">
            <div className="w-20 h-20 flex-shrink-0 relative group">
              <img
                src={
                  currentTrack.albumImageUrl || "https://via.placeholder.com/64"
                }
                alt={currentTrack.album || "Album cover"}
                className="w-full h-full object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/10 rounded-lg group-hover:bg-transparent transition-colors" />
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <a
                href={currentTrack.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors truncate text-lg"
              >
                {currentTrack.name}
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-300 truncate font-medium">
                {currentTrack.artist}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                {currentTrack.album}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 space-y-1.5">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
              <motion.div
                className={`${
                  isPlaying ? "bg-green-500" : "bg-gray-400"
                } h-full rounded-full`}
                style={{ width: `${progressPercentage}%` }}
                layoutId="progress"
              />
            </div>
            <div className="flex justify-between text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              <span>{formatTime(currentProgress)}</span>
              <span>{formatTime(currentTrack.duration)}</span>
            </div>
          </div>
        </div>
      ) : recentTrack ? (
        // Recently played track
        <div className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <FaHistory className="text-gray-400 text-sm" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Last Played {recentTrack.relativeTime}
            </span>
          </div>

          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 flex-shrink-0">
              <img
                src={
                  recentTrack.albumImageUrl || "https://via.placeholder.com/64"
                }
                alt={recentTrack.album || "Album cover"}
                className="w-full h-full object-cover rounded-lg shadow-sm grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <a
                href={recentTrack.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors truncate block"
              >
                {recentTrack.name}
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {recentTrack.artist}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // No track information
        <div className="flex flex-col items-center justify-center py-6 text-gray-500 dark:text-gray-400">
          <FaSpotify className="text-4xl text-gray-300 dark:text-gray-600 mb-2" />
          <p className="text-sm font-medium">No active session</p>
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
