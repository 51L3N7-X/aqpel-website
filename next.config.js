/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  test: true,
  images: {
    domains: ["toppng.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig
