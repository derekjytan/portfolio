import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSpotify, FaMusic } from "react-icons/fa";

const API_URL = "/api/spotify?type=top-artists";

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
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-10"
    >
      <div className="flex items-center gap-2 mb-6">
        <FaSpotify className="text-green-500 text-xl" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          Here are my top 5 artists this month!
        </h3>
      </div>

      {artists.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {artists.map((artist, index) => (
            <motion.a
              key={artist.id}
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex flex-col items-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 transition-all cursor-pointer group"
            >
              <div className="w-20 h-20 mb-3 relative">
                {artist.images && artist.images[0] ? (
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="w-full h-full object-cover rounded-full group-hover:ring-2 ring-green-500 transition-all"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <FaMusic className="text-gray-400 text-2xl" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center shadow-sm text-xs font-bold text-gray-400 border border-gray-100 dark:border-gray-700">
                  {index + 1}
                </div>
              </div>
              <p className="text-center font-semibold text-sm text-gray-800 dark:text-gray-200 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                {artist.name}
              </p>
            </motion.a>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <p>No top artists data available</p>
        </div>
      )}
    </motion.div>
  );
};

export default TopArtists;
