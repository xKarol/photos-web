import defaultConfig from "tailwindcss/defaultConfig";

const defaultScreens = defaultConfig.theme.screens;

export const getScreenSizes = ({
  asNumbers = false,
}: {
  asNumbers?: boolean;
} = {}) => {
  if (asNumbers)
    return transformObjectValuesToNumbers(defaultScreens) as Record<
      "sm" | "md" | "lg" | "xl" | "2xl",
      number
    >;
  return defaultScreens as Record<"sm" | "md" | "lg" | "xl" | "2xl", string>;
};

function transformObjectValuesToNumbers<T>(screens: T, replaceString = "px") {
  const sizes: Record<string, number> = {};

  for (const [key, value] of Object.entries(screens)) {
    if (String(value).includes(replaceString)) {
      sizes[key] = +String(value).replace(replaceString, "");
    }
  }
  return sizes;
}
