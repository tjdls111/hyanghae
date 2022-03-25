/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: "AIzaSyCgIeMHyGHni4vVHFfT57zbp7scMaK9J38",
    FIREBASE_AUTH_DOMAIN: "hyang-b007d.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://hyang-b007d.firebaseio.com",
    FIREBASE_BUCKET: "hyang-b007d.appspot.com",
    EBAY_API_KEY:
      "v^1.1#i^1#I^3#p^3#r^0#f^0#t^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",
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
