/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: "AIzaSyCgIeMHyGHni4vVHFfT57zbp7scMaK9J38",
    FIREBASE_AUTH_DOMAIN: "hyang-b007d.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://hyang-b007d.firebaseio.com",
    FIREBASE_BUCKET: "hyang-b007d.appspot.com",
    EBAY_API_INFO_:
      "seoinkim--PRD-094e46b78-f284ac31:PRD-94e46b784633-5c2d-438c-ae10-1d0e",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
