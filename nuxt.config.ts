// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  // mongoose: {
  //   uri: process.env.MONGO_URI,
  //   modelsDir: "models",
  //   devtools: true,
  // },

  nitro: {
    routeRules: {
      "/api/**": { cors: true },
    },
  },
  routeRules: {
    "/api/**": { cors: true },
  },

  // css: ["~/assets/app.css"],
});
