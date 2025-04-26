/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.scdn.co", "via.placeholder.com"], // Allow Spotify album covers
  },
  // Added to handle Spotify API calls from server
  serverRuntimeConfig: {
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
    },
  },
  // Enable experimental app directory for Next.js
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;
