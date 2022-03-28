/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: "AIzaSyCgIeMHyGHni4vVHFfT57zbp7scMaK9J38",
    FIREBASE_AUTH_DOMAIN: "hyang-b007d.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://hyang-b007d.firebaseio.com",
    FIREBASE_BUCKET: "hyang-b007d.appspot.com",
    EBAY_API_KEY:
      "v^1.1#i^1#p^1#r^0#I^3#f^0#t^H4sIAAAAAAAAAOVYa4wTVRTe7ovwVkAwREN3wJCszHRefQ202H2xDdvd7rassPJwOnOnzO50Zpx7u0slQC2KEiXEV1AT4mJIMBoTRIg/TAhEQoBgVAKSaCI/CBGNvFTQGEKcmS2luyIQWs0m9k8z55577vd995x7zwyZrR1bv6l10+8THWMqB7NkttLhoMaTY2trHp9UVTmzpoIscnAMZudkq3NV5xdAPqXoXBeAuqZC4FyTUlTI2cYAljZUTuOhDDmVTwHIIYGLhSJtHE2QnG5oSBM0BXOGmwKYW/RJrCS63cBNemlJNK3qzZhxLYABr+D38B4fy4iiAERgjkOYBmEVIl5FAYwmaRonGZz2xUmWc1McQxE05evBnN3AgLKmmi4EiQVtuJw91yjCemeoPITAQGYQLBgOtcQ6QuGm5vb4AldRrGBehxjiURoOf2rURODs5pU0uPMy0PbmYmlBABBiruDQCsODcqGbYO4Dvi01K7KiV6TdXsrHC16/VBYpWzQjxaM747AssohLtisHVCSjzN0UNdVI9AIB5Z/azRDhJqf115nmFVmSgRHAmhtCy0LRKBaEQJPVPjmF49GuJpz0s4D1JLw+XKJ9LC8wVH6BoSh5eUes0KipomyJBZ3tGmoAJlowUhO2SBPTqUPtMEISspAU+3kK2rE91mYO7V4arVat/QQpUwCn/Xh35QuzETLkRBqBQoSRA7Y0AYzXdVnERg7aOZhPmzUwgK1GSOdcroGBAWKAITQj6aJJknItjbTFhNUgxWMFXzlg1fpdJ+CyTUUwy9Ocw6GMbmJZY+aoCUBNYkHW7fHTvrzuw2EFR1r/Ziji7BpeCeWqjARJ0qxbpLyiP+FJ2IdQyZURzCeny8IBEnwGT/FGH0C6wgsAF8w8S6eAIYsc45ZoxicBXPT4JZz1SxKecIsenJIAIAFIJAS/7/9QIPea4jEgGACVNcdLzu/WmNoIPP3xZ9LuJymP2N0O9WVQj1CdLFgCugYirW0i42KfjSNfOHCvVXBb8o2KbCoTN9f/NwSwar0EETSIgFgSvZig6SCqKbKQGV0bzBhilDdQJgYUxTSURDKk6+HyntEl07vH4+H++Jb/TvqP76PbsoJWqo4uVtZ8aAbgdZmwbhxC0FIujTdbDcu0ykZcYGfV+v3wls0OdVSxNkkOsZXFodaSsCkTsF8gDAC1tGF21USH1XHFtT6gmvcYMjRFAUZ3aXlt1XEqlUZ8QgGjraDLkOAyP8ouWcrD+liWIf2lbZtgX6GrRtuRVK4j+HbNc/Xcf2ifXcNf4oMV9o/KOfaROcfHlQ4H6SIfo2aTdbVVS6qrJsyEMgKEzEsElJOq+W5qAKIPZHReNiprHesjXOepos8GgyvIhwsfDsZWUeOLviKQj9waqaEmz5hI0yRD+0jWTTFUDzn71mg1Nb162vyrr+xPMuLhdSdOvtd3ev7PB2dfnkpOLDg5HDUV1TlHxUPXFmbZxT3fnqIP7KB3vXRi4wsfHrnw2dTAy+fWnq1J1l2M6tMPTakfPLi+o+PC9nlHrm3uPfrFTw/EhcNNUxrO7utpeXfvDjT5uZ7d44KHmkOZtzMnHuz/89jF6/qkS8/vvfT1i866w1VP/LL9xlZl0eC27JbFnuVfRX59rS38yUc32mZcEY7nzvxx4OnrVw9EL897JzJ35/6TFVvejJw5vfmbc0xzpNcfyX23/Pis+h+TCXdr7+WuWVv5CaGT9fTaIxunf7ByYUtuVxvXunJa/xu7na+/9eXOyVOXLX31yoamFxfN+f6phnFjiD1L9pzf/vm6C6u27U3+drRuW/aHXHrD3EOLG4+JnfjF91c8+ql3aPv+AgtDJR7QEQAA",
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
