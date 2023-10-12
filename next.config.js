/** @type {import('next').NextConfig} */
const env = process.env.NODE_ENV;
const { API_URL } = require('./lib/config');
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: API_URL + '/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
