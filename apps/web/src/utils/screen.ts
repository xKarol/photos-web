import defaultConfig from "tailwindcss/defaultConfig";
import type { ResolvableTo, ScreensConfig } from "tailwindcss/types/config";

const defaultScreens = defaultConfig.theme.screens;

const getScreenSizesAsNumbers = (screens: ResolvableTo<ScreensConfig>) => {
  const sizes: Record<string, number> = {};

  for (const [key, value] of Object.entries(screens)) {
    if (String(value).includes("px")) {
      sizes[key] = +String(value).replace("px", "");
    }
  }
  return sizes;
};

export const getScreenName = (screenWidth: number) => {
  const screensValues = getScreenSizesAsNumbers(defaultScreens);
  for (const [key, value] of Object.entries(screensValues).reverse()) {
    if (screenWidth >= value) return key;
  }
  return Object.keys(screensValues)[0];
};
