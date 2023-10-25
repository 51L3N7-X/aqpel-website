/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["toppng.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig
