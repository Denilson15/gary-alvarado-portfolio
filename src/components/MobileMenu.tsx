import { useEffect, useId, useRef, useState } from "react";

interface NavLink {
    href: string;
    label: string;
    current: boolean;
}

interface Props {
    links: NavLink[];
    openLabel: string;
    closeLabel: string;
    navLabel: string;
}

export default function MobileMenu({ links, openLabel, closeLabel, navLabel }: Props) {
    const [open, setOpen] = useState(false);
    const panelId = useId();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setOpen(false);
                buttonRef.current?.focus();
            }
        }
        function onResize() {
            if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
        }
        document.addEventListener("keydown", onKeyDown);
        window.addEventListener("resize", onResize);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("resize", onResize);
        };
    }, [open]);

    return (
        <div className="md:hidden">
            <button
                ref={buttonRef}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                aria-label={open ? closeLabel : openLabel}
                onClick={() => setOpen((value) => !value)}
                className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-muted hover:text-accent"
            >
                <svg
                    className="size-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    aria-hidden="true"
                >
                    {open ? (
                        <path d="M6 6l12 12M18 6 6 18" />
                    ) : (
                        <path d="M4 7h16M4 12h16M4 17h16" />
                    )}
                </svg>
            </button>

            <div
                ref={panelRef}
                id={panelId}
                hidden={!open}
                className="absolute inset-x-0 top-full border-b border-line bg-bg/95 shadow-lg backdrop-blur"
            >
                <nav aria-label={navLabel} className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
                    <ul className="flex flex-col">
                        {links.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    aria-current={link.current ? "page" : undefined}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-lg px-3 py-3 text-lg font-medium text-ink hover:bg-surface-muted aria-[current=page]:text-accent"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
