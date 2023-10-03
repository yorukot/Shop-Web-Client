/** @type {import('next').NextConfig} */
const nextConfig = {rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:"http://127.0.0.1:8000/api/",
      }]}}

module.exports = nextConfig
