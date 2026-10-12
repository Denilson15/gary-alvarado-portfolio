import { useEffect, useState } from "react";

type Theme = "light" | "dark";

interface Props {
    toLightLabel: string;
    toDarkLabel: string;
}

const STORAGE_KEY = "theme";

function readTheme(): Theme {
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export default function ThemeToggle({ toLightLabel, toDarkLabel }: Props) {
    const [theme, setTheme] = useState<Theme | null>(null);

    useEffect(() => {
        setTheme(readTheme());
    }, []);

    function toggle() {
        const next: Theme = readTheme() === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // Storage can be unavailable in private windows; the toggle still works for this page.
        }
        setTheme(next);
    }

    const label = theme === "dark" ? toLightLabel : toDarkLabel;

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={label}
            title={label}
            className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-muted hover:text-accent"
        >
            {/* Both icons render on the server; CSS shows the right one before hydration. */}
            <svg
                className="size-5 dark:hidden"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
            >
                <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
            </svg>
            <svg
                className="hidden size-5 dark:block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden="true"
            >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
        </button>
    );
}
