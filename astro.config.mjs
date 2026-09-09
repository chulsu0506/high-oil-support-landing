import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://oilguide.infoarounds.com",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap({ filter: (page) => !page.includes("/archive/") })],
  adapter: cloudflare({
    imageService: "compile"
  })
});
