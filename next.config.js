/** @type {import('next').NextConfig} */
const env = process.env.NODE_ENV;

const API_URL = (env === "development" ? 'https://my-computer.nightcat.xyz/api': 'https://pccuhort/api')

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
