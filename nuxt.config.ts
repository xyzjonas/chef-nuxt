// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  devtools: { enabled: false },

  modules: ["@unocss/nuxt", "@vueform/nuxt", "@vite-pwa/nuxt"],

  devServer: {
    port: 3001,
  },
  pwa: {
    // registerType: "autoUpdate",
    // strategies: "generateSW",
    // workbox: {
    //   clientsClaim: true,
    //   skipWaiting: true
    // },
    manifest: {
      name: "Chef",
      short_name: "Chef",
      theme_color: "#d35459",
      background_color: "#d35459",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    devOptions: {
      enabled: true,
    },
  },

  compatibilityDate: "2024-07-06",
});