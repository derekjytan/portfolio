import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSpotify, FaMusic } from "react-icons/fa";

const API_URL = "http://127.0.0.1:3000/api/spotify/top-artists";

const TopArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopArtists();
  }, []);

  const fetchTopArtists = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Failed to fetch top artists: ${response.status}`);
      }

      const data = await response.json();
      setArtists(data.items || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching top artists:", err);
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
      <div className="rounded-xl bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <FaSpotify className="text-green-500 text-2xl mr-2" />
          <h3 className="text-xl font-bold">My Top Artists</h3>
        </div>
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <p>{error}</p>
          <button
            onClick={fetchTopArtists}
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
      className="rounded-xl bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center mb-4">
        <FaSpotify className="text-green-500 text-2xl mr-2" />
        <h3 className="text-xl font-bold">My Top Artists</h3>
      </div>

      {artists.length > 0 ? (
        <div className="space-y-4">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-12 h-12 flex-shrink-0 mr-4">
                {artist.images && artist.images[0] ? (
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <FaMusic className="text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <a
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-800 dark:text-white hover:text-green-500 dark:hover:text-green-400 transition-colors"
                >
                  {artist.name}
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {artist.genres.slice(0, 2).join(", ")}
                </p>
              </div>
              <div className="text-2xl font-bold text-gray-300 dark:text-gray-600">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <p>No top artists data available</p>
        </div>
      )}
    </motion.div>
  );
};

export default TopArtists;
