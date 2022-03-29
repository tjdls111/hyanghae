/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: "AIzaSyCgIeMHyGHni4vVHFfT57zbp7scMaK9J38",
    FIREBASE_AUTH_DOMAIN: "hyang-b007d.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://hyang-b007d.firebaseio.com",
    FIREBASE_BUCKET: "hyang-b007d.appspot.com",
    EBAY_API_KEY:
      "v^1.1#i^1#p^3#I^3#r^0#f^0#t^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",
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
