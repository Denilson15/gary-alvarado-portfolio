// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { routes } from "./src/i18n/routes.ts";

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
            // Pair each English page with its Spanish version (their slugs differ, e.g. /about/ and /es/sobre-mi/).
            serialize(item) {
                const path = new URL(item.url).pathname;
                const route = Object.values(routes).find((r) => r.en === path || r.es === path);
                if (route) {
                    item.links = [
                        { lang: "en", url: new URL(route.en, SITE_URL).href },
                        { lang: "es", url: new URL(route.es, SITE_URL).href },
                        { lang: "x-default", url: new URL(route.en, SITE_URL).href },
                    ];
                }
                item.lastmod = new Date().toISOString();
                return item;
            },
        }),
    ],
    vite: {
        plugins: [tailwindcss()],
    },
});
