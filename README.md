# Gary Alvarado: Portfolio

Personal portfolio site in English and Spanish. It's aimed first at recruiters and research faculty, with a separate
Services page for freelance website clients.

- **Stack:** [Astro](https://astro.build) with TypeScript, Tailwind CSS v4, and React only for the theme toggle and mobile menu
- **Languages:** English at `/`, Spanish at `/es/`, using Astro's built-in i18n routing
- **Hosting:** Netlify, with Netlify Forms for the contact and quote forms

## Run it locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # type-check, then build to dist/
npm run preview      # serve the built site
npm run format       # format everything with Prettier (4-space indentation)
```

## Project structure

```text
public/                     Static files: favicon, social preview images (og-en.jpg, og-es.jpg), resume.pdf
src/
    assets/                 Images optimized at build time (portrait, project screenshots)
    components/             Small reusable pieces: Header, ProjectCard, FormField, …
    content/projects/       One JSON file per project
    content.config.ts       Schema for project files
    data/site.ts            GitHub, LinkedIn, resume link, tools list
    data/projects.json      Raw GitHub discovery output (reference only; not rendered)
    i18n/en.json, es.json   Every UI string, in both languages
    i18n/routes.ts          Maps each page to its English and Spanish URL
    layouts/BaseLayout.astro  <head> (SEO, hreflang, Open Graph), header, footer
    pages/                  Thin route files: English at the top level, Spanish under es/
    views/                  Page content shared by both languages
    styles/global.css       Color tokens (light and dark), fonts, base styles
```

## Add a project

1. Create a JSON file in `src/content/projects/`, for example `my-project.json`:

    ```json
    {
        "title": "My Project",
        "summary": {
            "en": "One sentence about what it is.",
            "es": "Una oración sobre qué es."
        },
        "problem": {
            "en": "What problem it solves."
        },
        "solution": {
            "en": "How it solves it."
        },
        "tags": ["Python", "PyTorch"],
        "category": "live",
        "liveUrl": "https://example.netlify.app/",
        "repoUrl": "https://github.com/Denilson15/my-project",
        "image": "../../assets/projects/my-project.png",
        "hue": 200,
        "featured": false,
        "order": 5
    }
    ```

2. Save it. The Projects page picks it up automatically, with no layout code to touch.

Field notes:

| Field                            | Notes                                                                                         |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| `summary`, `problem`, `solution` | `en` is required. If `es` is missing, the Spanish site shows the English text.                |
| `category`                       | `live`, `client`, `code`, or `in-progress`. Each one is its own section on the Projects page. |
| `image`                          | Optional screenshot in `src/assets/projects/`. Without one, a colored preview card is shown.  |
| `hue`                            | Color (0 to 360) of that preview card.                                                        |
| `team`                           | `true` adds a "Team project" badge.                                                           |
| `featured`                       | `true` shows it under "Selected work" on the home page (the first 3 are used).                |
| `order`                          | Sort order inside its category. Lower numbers come first.                                     |
| `visible`                        | `false` hides it without deleting the file.                                                   |

**Screenshots:** take them at 1440 × 900 (16:10 works best), save them as PNG or JPG in
`src/assets/projects/`, and add the `image` field. Astro resizes and converts them to WebP when it builds.

## Edit text and translations

- All interface text lives in `src/i18n/en.json` and `src/i18n/es.json`. Both files have the same keys.
  Change a string in both files.
- Components call `t("section.key")`. TypeScript flags any key that doesn't exist in `en.json`.
- If a key is missing from `es.json`, the English text is used instead.
- The Spanish copy addresses the reader as **usted**, which reads as professional for small business clients.
- Project descriptions are kept in the project JSON files, not in the translation files.

### Add a page

1. Add an entry to `src/i18n/routes.ts`, for example `blog: { en: "/blog/", es: "/es/blog/" }`.
2. Create a view in `src/views/` that takes a `lang` prop and wraps its content in `BaseLayout`.
3. Add `src/pages/blog.astro` and `src/pages/es/blog.astro`. Each one renders the view with `lang="en"` or `lang="es"`.
4. To show it in the header, add its id to `navRoutes`, and add `nav.blog` to both translation files.

The language toggle and hreflang tags use the route map, so they keep visitors on the equivalent page.

## Personal details

Edit `src/data/site.ts` for your GitHub, LinkedIn, resume link, and the tools listed on the About page.

Your email address is intentionally **not** shown on the site, to keep it away from spam scrapers. Visitors write to
you through the contact and quote forms, which Netlify forwards to your inbox. Recruiters can also find your email in the resume.

`public/resume.pdf` is the public copy of your resume. Its phone number is removed and its location reads "San Francisco
Bay Area". When you update your resume, export a new PDF without the phone number and replace this file.

The portrait is `src/assets/gary-alvarado.jpg`. To replace it, swap the file and keep the same name. A 4:5 crop
works best. The social preview images (`public/og-en.jpg`, `public/og-es.jpg`) are 1200 × 630.

## Deploy to Netlify

1. In Netlify: **Add new site → Import an existing project → GitHub** → choose `gary-alvarado-portfolio`.
2. The build settings come from `netlify.toml` (`npm run build`, publish `dist`, Node 22). Deploy.
3. **Forms:** go to **Site configuration → Forms** and enable form detection, then redeploy once. Netlify will
   find the `contact` and `quote` forms in both languages. Under **Forms → Form notifications**, add an
   email notification so submissions reach your inbox.
4. Once you know the final URL (a `*.netlify.app` name or a custom domain), update `SITE_URL` in
   `astro.config.mjs` and the `Sitemap:` line in `public/robots.txt`. Canonical URLs, hreflang tags,
   social previews, and the sitemap all depend on it.

Every push to `main` redeploys the site.

## Accessibility and performance

- Semantic landmarks, skip link, visible focus rings, labeled controls, and keyboard-friendly menus
- Text colors meet WCAG AA in both themes. Tokens live in `src/styles/global.css`.
- Light and dark mode follow the system setting until the visitor picks one; the choice is remembered.
- Scroll and hover animations turn off when `prefers-reduced-motion` is set.
- On the last check (local preview), Lighthouse scored 98–99 for Performance and 100 for Accessibility,
  Best Practices, and SEO, and axe-core found no violations on any page in either theme.

## To fill in

Search the code for `PLACEHOLDER` or `PENDIENTE` to find the remaining text placeholders.

- [ ] **Pricing**: `services.pricingBody` in both translation files
- [ ] **Testimonials**: `services.testimonialsBody`, with real quotes used with permission (or remove the block from `src/views/ServicesView.astro`)
- [ ] **Screenshots** for every project except the Communication System (see "Add a project")
- [ ] **Check the live links**: none of the live URLs could be load-tested from the build environment
- [ ] **Tenzies**: add a `liveUrl` if it's deployed, and confirm the description matches the game
- [ ] **PT Anatomy Atlas**: add a `liveUrl` once GitHub Pages is turned on for `/docs`
- [ ] **Client permission**: confirm Braulio (Diamond Lens) and your family member are happy to be listed
- [ ] **Spanish review**: have a native speaker read the project blurbs and the Services page
- [ ] **Site URL**: `astro.config.mjs` and `public/robots.txt` once the domain is set
- [ ] **Netlify Forms**: turn on form detection and email notifications (this is how messages reach you)
