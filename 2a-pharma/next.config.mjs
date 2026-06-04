/** @type {import('next').NextConfig} */
const repo = "/2apharma";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },

  basePath: repo,
  assetPrefix: repo + "/",
};

export default nextConfig;