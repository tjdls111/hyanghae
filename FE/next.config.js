/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "basenotes.com",
      "fimgs.net",
      "venerafragrances.com",
      "cdn.shopify.com",
      "www.directbeautique.co.uk",
      "www.elegantlyclassy.com",
      "www.mecca.com.au",
      "www.reallyree.com",
      "piimages.parfumo.de",
      "i.etsystatic.com",
      "fraguru.com",
    ],
  },
  env: {
    FIREBASE_API_KEY: "AIzaSyCgIeMHyGHni4vVHFfT57zbp7scMaK9J38",
    FIREBASE_AUTH_DOMAIN: "hyang-b007d.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://hyang-b007d.firebaseio.com",
    FIREBASE_BUCKET: "hyang-b007d.appspot.com",
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
