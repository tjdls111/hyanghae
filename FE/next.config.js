/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: "AIzaSyCgIeMHyGHni4vVHFfT57zbp7scMaK9J38",
    FIREBASE_AUTH_DOMAIN: "hyang-b007d.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://hyang-b007d.firebaseio.com",
    FIREBASE_BUCKET: "hyang-b007d.appspot.com",
    EBAY_API_KEY:
      "v^1.1#i^1#f^0#p^1#I^3#r^0#t^H4sIAAAAAAAAAOVYa2wUVRTu9mUawBrDK1jMOgUxyMzeeezu7MguLG2hG+kDdqnQSHB25m47dHZmnHuXdmkqaxGIMQFjjEIwSjWGV6waBIOP+gMQTYwxRokRm6gxhsQAIhCNlujMdFu2FYGwq2ni/tnMueee+33fPefeMwMy5RXzt9Zv/XWK67biPRmQKXa56Emgorzs/ttLimeVFYEcB9eezJxMaW/JmYVITKqGsBIiQ9cQdHclVQ0JjjFIpExN0EWkIEETkxAJWBKi4YblAkMBwTB1rEu6SrgjtUEiEPD5AEPTEvCCOAxwllUbiRnTgwTLcBzrEyFDs7KPlUVrHKEUjGgIixoOEgxgGBKwJMPHgE/w+gUOULwXtBLuFmgiRdcsFwoQIQeu4Mw1c7BeH6qIEDSxFYQIRcJLo03hSG1dY2yhJydWKKtDFIs4hcY+1egydLeIagpefxnkeAvRlCRBhAhPaHiFsUGF8AiYW4DvSB2XvICP8wl/APh5HkgFkXKpbiZFfH0ctkWRyYTjKkANKzh9I0UtNeLroYSzT41WiEit2/5bkRJVJaFAM0jULQmvCTc3EyEEdUXrUJIk2byylgQBDnK+uJ8nEwzPiRJLZxcYjpKVd9wKNbomK7ZYyN2o4yXQQgvHa8LlaGI5NWlNZjiBbSS5fvyIdpy31d7M4d1L4XbN3k+YtARwO483Vn50NsamEk9hOBph/IAjTZAQDUORifGDTg5m06YLBYl2jA3B4+ns7KQ6WUo32zwMALRndcPyqNQOk1aRjfgqQbvWbziBVBwqErRmIkXAacPC0mXlqAVAayNCnNcXYPis7mNhhcZb/2bI4ewZWwmFqgxaZmmGlgN+hqV5NsAXojJC2eT02DhgXEyTSdHsgNhQRQmSkpVnqSQ0FVlgvQmG5ROQlH2BBMkFEgky7pV9JJ2AEEAYj0sB/v9QIDeb4lEomRAXNMfzzu/6qFYDfRtij6a8D9E+uaURGWuQ0UCv4OAquLKzoX65zHq4jTHMR4I3WwXXJF+jKpYyMWv9f0MAu9bzEEFHGMp50YtKugGbdVWR0hNrg1lTbhZNnI5CVbUMeZEMG0aksGd03vRu8ni4Nb6Fv5P+4/vomqyQnaoTi5U9H1kBREOh7BuHkvSkRxetVsM2rXMQj7Kza/1WeCtWhzqhWFskh9kq8nBrSTmUKbRBokyI9JRpddVUk91xxfQOqFn3GDZ1VYVmS355bddxMpnCYlyFE62gC5DgijjBLlnax1kdA7DeF/PiJTlX6LqJdiQV6gi+VvNcOu8f2mfP2Jf4UJHzo3tdh0Gv681ilwt4wFy6GtxTXrKqtGTyLKRgSCligkJKm2a9m5qQ6oBpQ1TM4nLXYw3Cii9zPhvsWQtmjn44qCihJ+V8RQBVV0fK6MoZUxgGsAwPfF4/B1pB9dXRUnp66dT9Je3+z9YfOvrWwOQvhh4IvbD9zqmVYMqok8tVVlTa6ypiu0H3nMyR+XPBa3eU/0BcPvsx6u059962Ywf2xo6GjzQt6N5bLOyCiz4dFF65O7ivf/7qP9ZM7+mrPDv0286hbdUXq4591HL6z8vT5M2Lnnpj5pUTg6f8zx2sHKwvIn6qWLajO93cS23srVj74Iy3X37mpXBT327/jIU/k4P3uatqiMd3P3Hhu+2nj+/b9eLs6W1dBzftfPrMu4tXHbxSNWQcOncgVv5V/9z+TM/Rrz/Z9P7aA98OTntSXbBlf1/diZP96vmhIvbDHV0nT11Kz+vTh149sXgzeX6gpvXhSQPfvzO7564Lv1R/8GN0Sd/nmWcvPsUd376sc8HSw3Wvb3x+371bvrn0CDUgNZTN+X0wPbx9fwHUoXih0BEAAA==",
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
