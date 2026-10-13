import type { Lang } from "@/i18n/config";
import { getPath, type RouteId } from "@/i18n/routes";
import { localized, useTranslations, type Dictionary } from "@/i18n/utils";
import { interests, site } from "@/data/site";
import type { Project } from "@/lib/projects";

/**
 * Schema.org structured data (JSON-LD) helpers. Search engines use these to understand
 * who Gary is, what the services are, and which projects are listed.
 */
type JsonLd = Record<string, unknown>;

const abs = (path: string, base: URL) => new URL(path, base).href;

export function personAndWebsite(lang: Lang, base: URL): JsonLd[] {
    const t = useTranslations(lang);
    const home = abs(getPath("home", lang), base);
    return [
        {
            "@type": "Person",
            "@id": `${abs("/", base)}#person`,
            name: site.name,
            url: home,
            image: abs(`/og-${lang}.jpg`, base),
            jobTitle:
                lang === "es"
                    ? "Estudiante de maestría en Ciencias de la Computación"
                    : "MS Computer Science student",
            affiliation: {
                "@type": "CollegeOrUniversity",
                name: "University of California, Davis",
            },
            alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "California State University, East Bay",
            },
            homeLocation: { "@type": "Place", name: "San Francisco Bay Area, California" },
            knowsAbout: interests.map((key) => t(`interests.${key}`)),
            knowsLanguage: ["en", "es"],
            sameAs: [site.github, site.linkedin],
        },
        {
            "@type": "WebSite",
            "@id": `${abs("/", base)}#website`,
            url: home,
            name: site.name,
            inLanguage: lang,
            publisher: { "@id": `${abs("/", base)}#person` },
        },
    ];
}

export function breadcrumbs(lang: Lang, routeId: RouteId, base: URL): JsonLd | null {
    if (routeId === "home" || routeId === "thanks" || routeId === "notFound") return null;
    const t = useTranslations(lang);
    return {
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: t("nav.home"),
                item: abs(getPath("home", lang), base),
            },
            {
                "@type": "ListItem",
                position: 2,
                name: t(`nav.${routeId}`),
                item: abs(getPath(routeId, lang), base),
            },
        ],
    };
}

export function projectList(projects: Project[], lang: Lang, base: URL): JsonLd {
    return {
        "@type": "ItemList",
        url: abs(getPath("projects", lang), base),
        itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "CreativeWork",
                name: project.data.title,
                description: localized(project.data.summary, lang),
                url: project.data.liveUrl ?? project.data.repoUrl,
                ...(project.data.repoUrl && { sameAs: project.data.repoUrl }),
                keywords: project.data.tags.join(", "),
                ...(project.data.year && { dateCreated: String(project.data.year) }),
                author: { "@id": `${abs("/", base)}#person` },
            },
        })),
    };
}

export function webServices(dict: Dictionary, lang: Lang, base: URL): JsonLd {
    return {
        "@type": "Service",
        serviceType: lang === "es" ? "Diseño y desarrollo web" : "Web design and development",
        name: dict.meta.services.title,
        description: dict.meta.services.description,
        url: abs(getPath("services", lang), base),
        provider: { "@id": `${abs("/", base)}#person` },
        areaServed: ["San Francisco Bay Area, CA", "Davis, CA"],
        availableLanguage: ["English", "Spanish"],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: dict.services.offerTitle,
            itemListElement: dict.services.offers.map((offer) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: offer.title, description: offer.body },
            })),
        },
    };
}
