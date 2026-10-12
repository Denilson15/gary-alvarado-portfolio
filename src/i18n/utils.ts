import en from "./en.json";
import es from "./es.json";
import { defaultLang, type Lang } from "./config";

const dictionaries = { en, es } as const;

export type Dictionary = typeof en;

/** Dot-separated paths to every leaf string in the English dictionary. */
type Leaves<T, Prefix extends string = ""> = {
    [K in keyof T & string]: T[K] extends string
        ? `${Prefix}${K}`
        : T[K] extends readonly unknown[]
          ? never
          : Leaves<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

export type TranslationKey = Leaves<Dictionary>;

function lookup(dict: unknown, key: string): unknown {
    return key.split(".").reduce<unknown>((node, part) => {
        if (node && typeof node === "object" && part in node) {
            return (node as Record<string, unknown>)[part];
        }
        return undefined;
    }, dict);
}

/**
 * Returns the dictionary for a language. Use it for arrays and objects,
 * such as lists of offers or research interests.
 */
export function getDictionary(lang: Lang): Dictionary {
    return dictionaries[lang] as Dictionary;
}

/**
 * Returns a translator for a language. Missing Spanish strings fall back to English.
 * Use `{name}` placeholders in strings and pass values in `vars`.
 */
export function useTranslations(lang: Lang) {
    return function t(key: TranslationKey, vars?: Record<string, string | number>): string {
        let value = lookup(dictionaries[lang], key) ?? lookup(dictionaries[defaultLang], key);
        if (typeof value !== "string") {
            throw new Error(`Missing translation for "${key}"`);
        }
        if (vars) {
            for (const [name, replacement] of Object.entries(vars)) {
                value = (value as string).replaceAll(`{${name}}`, String(replacement));
            }
        }
        return value as string;
    };
}

/** A string that may have a Spanish version. English is required. */
export interface LocalizedText {
    en: string;
    es?: string;
}

/** Picks the right language from a localized field, falling back to English. */
export function localized(text: LocalizedText, lang: Lang): string {
    return text[lang] ?? text.en;
}
