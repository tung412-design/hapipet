export type Locale = "zh" | "en";

export type Localized = {
  zh: string;
  en: string;
};

export type Coordinate = [number, number];

export type StoryCategory =
  | "animals-people"
  | "shops-people"
  | "history"
  | "culture"
  | "flavours"
  | "everyday";

export const pick = <T extends Localized>(value: T, locale: Locale) => value[locale];
