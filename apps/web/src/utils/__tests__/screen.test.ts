import { getScreenName } from "../screen";

const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

jest.mock("tailwindcss/defaultConfig", () => {
  return {
    theme: {
      screens: {
        //TODO dry
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  };
});

describe("screen", () => {
  describe("getScreenName function", () => {
    it.each(Object.entries(screens))(
      "screen size %s should return %i",
      (key, value) => {
        expect(getScreenName(value)).toBe(key);
      }
    );
    //TODO add more tests
    // it.each(Object.entries(screens))(
    //   "screen size %s should return %i",
    //   (key, value) => {
    //     expect(getScreenName(value + 1)).toBe(key);
    //   }
    // );
  });
});