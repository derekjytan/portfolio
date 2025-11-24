import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSpotify, FaMusic } from "react-icons/fa";

const API_URL = "/api/spotify?type=top-tracks";

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopTracks();
  }, []);

  const fetchTopTracks = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Failed to fetch top tracks: ${response.status}`);
      }

      const data = await response.json();
      setTracks(data.items || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching top tracks:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700 mt-6">
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <p>{error}</p>
          <button
            onClick={fetchTopTracks}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700 mt-6"
    >
      <div className="flex items-center mb-4">
        <FaSpotify className="text-green-500 text-2xl mr-2" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          My Top Tracks
        </h3>
      </div>

      {tracks.length > 0 ? (
        <div className="space-y-4">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
            >
              <div className="w-12 h-12 flex-shrink-0 mr-4 relative">
                {track.album && track.album.images && track.album.images[0] ? (
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="w-full h-full object-cover rounded-md shadow-sm group-hover:shadow-md transition-shadow"
                  />
                ) : (
                  <div className="w-full h-full rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <FaMusic className="text-gray-400" />
                  </div>
                )}
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-xs font-bold text-gray-500 shadow-sm border border-gray-100 dark:border-gray-700">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <a
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-800 dark:text-white hover:text-green-500 dark:hover:text-green-400 transition-colors truncate block"
                >
                  {track.name}
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <p>No top tracks data available</p>
        </div>
      )}
    </motion.div>
  );
};

export default TopTracks;

