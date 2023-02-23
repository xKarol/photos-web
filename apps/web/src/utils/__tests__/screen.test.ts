import {
  getScreenName,
  calculateContainerPadding,
  getContainerPaddingValues,
} from "../screen";

const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const paddingValues = getContainerPaddingValues();

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
      "should return %s when screen size = %i",
      (key, value) => {
        expect(getScreenName(value)).toBe(key);
      }
    );
    it.each(Object.entries(screens))(
      "should return %s when screen size = %i",
      (key, value) => {
        expect(getScreenName(value + 1)).toBe(key);
      }
    );
    it.each(Object.entries(screens))(
      "%s screen should return previous screen name when screen size = %i-1",
      (key, value) => {
        const keyIndex = Object.keys(screens).indexOf(key);
        const [prevKey] = Object.entries(screens)[keyIndex - 1] || ["sm"];
        expect(getScreenName(value - 1)).toBe(prevKey);
      }
    );
    it("should return last screen name", () => {
      expect(getScreenName(9999)).toBe("2xl");
    });
    it("should return first screen name", () => {
      expect(getScreenName(0)).toBe("sm");
    });
  });
  describe.skip("getContainerPadding function", () => {
    it.each([
      [screens.sm, paddingValues.sm],
      [screens.md, paddingValues.md],
      [screens.lg, paddingValues.lg],
      [screens.xl, paddingValues.xl],
      [screens["2xl"], paddingValues["2xl"]],
    ])("width %i should return %i padding", (screen, padding) => {
      expect(calculateContainerPadding(screen)).toBe(padding);
    });
  });
});
