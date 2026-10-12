export const languages = {
    en: "English",
    es: "Español",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "en";

/** BCP 47 tags used for hreflang and Open Graph locales. */
export const htmlLang: Record<Lang, string> = {
    en: "en",
    es: "es",
};

export const ogLocale: Record<Lang, string> = {
    en: "en_US",
    es: "es_419",
};

export function isLang(value: string | undefined): value is Lang {
    return value !== undefined && value in languages;
}
