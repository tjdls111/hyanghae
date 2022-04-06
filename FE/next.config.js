/** @type {import('next').NextConfig} */
// const EbayAuthToken = require("ebay-oauth-nodejs-client");

// const ebayAuthToken = new EbayAuthToken({
//   clientId: "seoinkim--PRD-094e46b78-f284ac31",
//   clientSecret: "PRD-94e46b784633-5c2d-438c-ae10-1d0e",
//   redirectUri:
//     "https://auth.ebay.com/oauth2/authorize?client_id=seoinkim--PRD-094e46b78-f284ac31&response_type=code&redirect_uri=seoin_kim-seoinkim--PRD-0-pnznt&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly",
// });

// (async () => {
//   const token = await ebayAuthToken.getApplicationToken('PRODUCTION');
//   console.log(token);
// })();

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
      "fraguru.com",
    ],
  },
  env: {
    FIREBASE_API_KEY: "AIzaSyCgIeMHyGHni4vVHFfT57zbp7scMaK9J38",
    FIREBASE_AUTH_DOMAIN: "hyang-b007d.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://hyang-b007d.firebaseio.com",
    FIREBASE_BUCKET: "hyang-b007d.appspot.com",
    EBAY_API_INFO_: "seoinkim--PRD-094e46b78-f284ac31:PRD-94e46b784633-5c2d-438c-ae10-1d0e",
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
