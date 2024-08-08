// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  devtools: { enabled: false },

  modules: [
    "@unocss/nuxt",
    "@vueform/nuxt",
  ],

  devServer: {
    port: 3001,
  },

  compatibilityDate: "2024-07-06",
});