import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSpotify, FaMusic, FaPlayCircle, FaServer } from "react-icons/fa";

const SPOTIFY_API_URL = "https://localhost:5000/api/spotify";

const SpotifyActivity = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [recentTracks, setRecentTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        setLoading(true);
        const response = await fetch(SPOTIFY_API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch Spotify data");
        }

        const data = await response.json();

        if (data.isPlaying && data.currentTrack) {
          setCurrentTrack(data.currentTrack);
        } else {
          setCurrentTrack(null);
        }

        if (data.recentTracks && data.recentTracks.length) {
          setRecentTracks(data.recentTracks);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching Spotify data:", err);
        setError("Unable to load Spotify data. Server might be offline.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpotifyData();

    // Poll for updates every minute
    const intervalId = setInterval(fetchSpotifyData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
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
          <p className="text-sm mt-2">
            Make sure the Spotify API server is running.
          </p>
        </div>
      </div>
    );
  }

  // If we have no current track and no recent tracks, display a fallback message
  if (!currentTrack && recentTracks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center mb-4">
          <FaSpotify className="text-green-500 text-2xl mr-2" />
          <h3 className="text-xl font-bold">My Spotify Activity</h3>
        </div>
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <p>No recent Spotify activity to display</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center mb-4">
        <FaSpotify className="text-green-500 text-2xl mr-2" />
        <h3 className="text-xl font-bold">My Spotify Activity</h3>
      </div>

      {currentTrack ? (
        <div className="mb-6">
          <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2 flex items-center">
            <FaPlayCircle className="mr-1" />
            Now Playing
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
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                {currentTrack.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {currentTrack.artist}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentTrack.album}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 flex items-center justify-center py-2 text-gray-500 dark:text-gray-400">
          <p>Not currently listening to anything</p>
        </div>
      )}

      {recentTracks.length > 0 && (
        <div>
          <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2 flex items-center">
            <FaMusic className="mr-1" />
            Recently Played
          </div>
          <div className="space-y-3">
            {recentTracks.map((track, index) => (
              <div key={index} className="flex items-center">
                <div className="w-10 h-10 flex-shrink-0 mr-3">
                  <img
                    src={
                      track.albumImageUrl || "https://via.placeholder.com/40"
                    }
                    alt={track.album || "Album cover"}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="overflow-hidden">
                  <p className="font-medium text-sm text-gray-800 dark:text-white truncate">
                    {track.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                    {track.artist}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SpotifyActivity;
