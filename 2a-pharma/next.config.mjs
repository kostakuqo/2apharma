const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  ...(isProd && { output: "export" }),
  images: { unoptimized: true },
  basePath: isProd ? "/2apharma" : "",
  assetPrefix: isProd ? "/2apharma/" : "",
  trailingSlash: true,
};

export default nextConfig;