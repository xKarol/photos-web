import { useMedia } from "react-use";
import { getScreenSizes } from "../utils/screen";

const screens = getScreenSizes();
const useScreen = (screen: keyof typeof screens, defaultState = false) => {
  return !useMedia(`(min-width: ${screens[screen]})`, defaultState);
};

export default useScreen;
