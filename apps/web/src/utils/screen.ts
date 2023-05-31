import { breakpoints } from "../styles/breakpoints";

export const getScreenSizes = ({
  asNumbers = false,
}: {
  asNumbers?: boolean;
} = {}) => {
  if (asNumbers)
    return transformObjectValuesToNumbers(breakpoints) as Record<
      "sm" | "md" | "lg" | "xl" | "2xl",
      number
    >;
  return breakpoints as Record<"sm" | "md" | "lg" | "xl" | "2xl", string>;
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
