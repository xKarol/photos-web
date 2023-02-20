import { useMedia } from "react-use";
import { getScreenSizes } from "../utils/screen";

const screens = getScreenSizes();
const useScreen = (screen: keyof typeof screens) => {
  return !useMedia(`(min-width: ${screens[screen]})`, false);
};

export default useScreen;
