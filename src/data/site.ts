/**
 * Personal details used across the site. Edit these in one place.
 * Values marked PLACEHOLDER still need to be filled in.
 */
export const site = {
    name: "Gary Alvarado",
    // PLACEHOLDER: replace with your real email address.
    email: "your-email@example.com",
    emailIsPlaceholder: true,
    github: "https://github.com/Denilson15",
    githubHandle: "Denilson15",
    linkedin: "https://www.linkedin.com/in/gary-alvarado-858467290",
    // PLACEHOLDER: add your resume as public/resume.pdf.
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
    languages: ["Python", "C++", "Java", "JavaScript", "TypeScript", "OCaml", "SQL", "Assembly"],
    frameworks: ["React", "Vite", "Express", "Next.js", "Astro", "Tailwind CSS", "three.js"],
    tools: ["Git", "GitHub", "Linux/UNIX", "VS Code", "Netlify", "GitHub Pages"],
    learning: ["PyTorch", "Rust"],
} as const;
