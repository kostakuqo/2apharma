const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  ...(isGithubPages && { output: "export" }),
  images: { unoptimized: true },
  basePath: isGithubPages ? "/2apharma" : "",
  assetPrefix: isGithubPages ? "/2apharma/" : "",
  trailingSlash: true,
  serverExternalPackages: ["firebase-admin", "google-gax", "@google-cloud/firestore"],
  turbopack: {},
};

export default nextConfig;