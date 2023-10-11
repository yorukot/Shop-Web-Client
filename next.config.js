/** @type {import('next').NextConfig} */
const nextConfig = {rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:"https://shop-web-api.nightcat.xyz/api/:path*",
      }]}}

module.exports = nextConfig
