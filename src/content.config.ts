import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/** English is required; Spanish falls back to English when missing. */
const localizedText = z.object({
    en: z.string(),
    es: z.string().optional(),
});

/**
 * One JSON file per project in src/content/projects/.
 * See README.md, "Add a project", for a copy-paste template.
 */
const projects = defineCollection({
    loader: glob({ pattern: "*.json", base: "./src/content/projects" }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            summary: localizedText,
            problem: localizedText,
            solution: localizedText,
            tags: z.array(z.string()).min(1),
            /** live: deployed and usable · client: built for a client · code: repo only · in-progress */
            category: z.enum(["live", "client", "code", "in-progress"]),
            /** Year shown in the project index, e.g. 2026. */
            year: z.number().int().optional(),
            liveUrl: z.url().optional(),
            repoUrl: z.url().optional(),
            /** Screenshot next to this file's image folder, e.g. "../../assets/projects/name.png". */
            image: image().optional(),
            /** Accent hue (0 to 360) for the generated preview used when there is no screenshot. */
            hue: z.number().min(0).max(360).default(172),
            team: z.boolean().default(false),
            /** Shown in "Selected work" on the home page. */
            featured: z.boolean().default(false),
            /** Lower numbers come first within a category. */
            order: z.number(),
            /** Set to false to hide a project without deleting its file. */
            visible: z.boolean().default(true),
        }),
});

export const collections = { projects };
