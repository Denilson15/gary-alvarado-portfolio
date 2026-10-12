import { getCollection, type CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;
export type ProjectCategory = Project["data"]["category"];

/** Display order of the sections on the Projects page. */
export const categoryOrder: ProjectCategory[] = ["live", "client", "code", "in-progress"];

export async function getProjects(): Promise<Project[]> {
    const projects = await getCollection("projects", ({ data }) => data.visible);
    return projects.sort(
        (a, b) =>
            categoryOrder.indexOf(a.data.category) - categoryOrder.indexOf(b.data.category) ||
            a.data.order - b.data.order,
    );
}

export async function getProjectsByCategory(category: ProjectCategory): Promise<Project[]> {
    return (await getProjects()).filter((project) => project.data.category === category);
}

export async function getFeaturedProjects(): Promise<Project[]> {
    return (await getProjects()).filter((project) => project.data.featured);
}
