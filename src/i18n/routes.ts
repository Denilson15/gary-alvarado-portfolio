import type { Lang } from "./config";

/**
 * Every page has one id and a localized path per language.
 * The language toggle and hreflang tags use this map to find the equivalent page.
 * To add a page: add an entry here, then create a file at each path under src/pages/.
 */
export const routes = {
    home: { en: "/", es: "/es/" },
    projects: { en: "/projects/", es: "/es/proyectos/" },
    about: { en: "/about/", es: "/es/sobre-mi/" },
    services: { en: "/services/", es: "/es/servicios/" },
    contact: { en: "/contact/", es: "/es/contacto/" },
    thanks: { en: "/thanks/", es: "/es/gracias/" },
    notFound: { en: "/404/", es: "/es/404/" },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteId = keyof typeof routes;

export function getPath(id: RouteId, lang: Lang): string {
    return routes[id][lang];
}

/** Pages shown in the header navigation, in order. */
export const navRoutes = [
    "projects",
    "about",
    "services",
    "contact",
] as const satisfies readonly RouteId[];
