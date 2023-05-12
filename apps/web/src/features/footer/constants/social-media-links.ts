import type { FunctionComponent } from "react";
import {
  IoLogoInstagram,
  IoLogoPinterest,
  IoLogoYoutube,
} from "react-icons/io";

export type SocialMediaType = {
  name: string;
  url: string;
  icon: FunctionComponent;
};

const socialMediaLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    IconElement: IoLogoInstagram,
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/",
    IconElement: IoLogoYoutube,
  },
  {
    name: "Pinterest",
    url: "https://pinterest.com/",
    IconElement: IoLogoPinterest,
  },
] as const;

export default socialMediaLinks;
