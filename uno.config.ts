// uno.config.ts
import { defineConfig, presetUno, presetIcons } from "unocss";
import presetWebFonts from '@unocss/preset-web-fonts'
import { createLocalFontProcessor } from "@unocss/preset-web-fonts/local";

export default defineConfig({
  rules: [],
  presets: [
    // https://icones.js.org/collection/hugeicons
    presetIcons({
      extraProperties: {
        "vertical-align": "middle",
      },
    }),
    presetUno(),
    presetWebFonts({
      provider: "bunny",
      fonts: {
        sans: "Poppins:200,300,400,500,600",
        // title: 'Bungee Inline',
        title: "Monoton",
      },
      processors: createLocalFontProcessor({
        // Directory to cache the fonts
        cacheDir: "node_modules/.cache/unocss/fonts",

        // Directory to save the fonts assets
        fontAssetsDir: "public/assets/fonts",

        // Base URL to serve the fonts from the client
        fontServeBaseUrl: "/assets/fonts",
      }),
    }),
  ],
});
