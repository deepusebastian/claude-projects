/** @type {import('next').NextConfig} */
const nextConfig = {
  // simple-icons is ESM-only; tell Next.js to transpile it for the client bundle
  transpilePackages: ["simple-icons"],
};

module.exports = nextConfig;
