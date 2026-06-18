export const dynamic = "force-static";

const BASE_URL = "https://kostakuqo.github.io/2apharma";
const BASE_PATH = "/2apharma";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          `${BASE_PATH}/admin`,
          `${BASE_PATH}/admin/`,
          `${BASE_PATH}/login`,
          `${BASE_PATH}/login/`,
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}