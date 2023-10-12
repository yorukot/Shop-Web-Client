/** @type {import('next').NextConfig} */
const env = process.env.NODE_ENV

const nextConfig = {rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: (env === "development" ? 'https://api-test.nightcat.xyz/api/:path*': 'https://shop-web.nightcat.xyz/api/:path*'),
      }]}}

module.exports = nextConfig
