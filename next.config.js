/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["toppng.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
