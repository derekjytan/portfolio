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
      className="rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg p-5 border border-white/20 dark:border-gray-700/50 mt-6"
    >
      <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
        <FaSpotify className="text-green-500" />
        Top 5 Tracks
      </h4>

      {tracks.length > 0 ? (
        <div className="space-y-3">
          {tracks.map((track, index) => (
            <motion.a
              key={track.id}
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700/50 hover:shadow-sm transition-all group"
            >
              <div className="font-bold text-gray-400 w-4 text-center text-sm">
                {index + 1}
              </div>
              
              <div className="w-10 h-10 flex-shrink-0 relative">
                {track.album && track.album.images && track.album.images[0] ? (
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="w-full h-full object-cover rounded shadow-sm group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <FaMusic className="text-gray-400 text-xs" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {track.name}
                </h5>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <p className="text-sm">No top tracks data available</p>
        </div>
      )}
    </motion.div>
  );
};

export default TopTracks;

