// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Replace with the final Netlify URL or custom domain once the site is deployed.
const SITE_URL = "https://gary-alvarado.netlify.app";

export default defineConfig({
    site: SITE_URL,
    trailingSlash: "ignore",
    i18n: {
        locales: ["en", "es"],
        defaultLocale: "en",
        routing: {
            prefixDefaultLocale: false,
        },
    },
    integrations: [
        react(),
        sitemap({
            filter: (page) => !/\/(404|thanks|gracias)\/?$/.test(new URL(page).pathname),
            i18n: {
                defaultLocale: "en",
                locales: {
                    en: "en-US",
                    es: "es",
                },
            },
        }),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
});
