/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow external image sources used in ToolLogo
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "https",
        hostname: "huggingface.co",
      },
    ],
  },
};

module.exports = nextConfig;
