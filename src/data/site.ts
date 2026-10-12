/**
 * Personal details used across the site. Edit these in one place.
 * Your email is intentionally not published here, to keep it away from scrapers.
 * Visitors reach you through the contact form (Netlify Forms) or the resume PDF.
 */
export const site = {
    name: "Gary Alvarado",
    github: "https://github.com/Denilson15",
    githubHandle: "Denilson15",
    linkedin: "https://www.linkedin.com/in/gary-alvarado-858467290",
    // Public copy of the resume, with the phone number removed.
    resume: "/resume.pdf",
    studentPortfolios: "https://github.com/Denilson15/Student-Webpages",
} as const;

export const interests = [
    "softwareEngineering",
    "ai",
    "computerVision",
    "robotics",
    "hci",
    "education",
    "health",
] as const;

export const tools = {
    languages: [
        "Python",
        "C++",
        "Java",
        "JavaScript",
        "TypeScript",
        "Rust",
        "OCaml",
        "SQL",
        "HTML",
        "CSS",
    ],
    frameworks: ["React", "Vite", "Express", "Next.js", "Astro", "Tailwind CSS", "three.js"],
    tools: ["Git", "GitHub", "REST APIs", "Linux/UNIX", "VS Code", "Netlify", "GitHub Pages"],
    learning: ["PyTorch", "Computer vision"],
} as const;
