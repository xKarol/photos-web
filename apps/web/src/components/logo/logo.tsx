import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import React from "react";

import logoSrc from "../../../public/assets/logo.svg";
import routes from "../../config/routes";

export type LogoProps = {
  href?: string;
} & Partial<ImageProps>;

const Logo = ({ href = routes.HOME, ...rest }: LogoProps) => {
  return (
    <figure className="w-[40px]">
      <Link href={href}>
        <Image {...rest} src={logoSrc} alt="logo" />
      </Link>
    </figure>
  );
};

export default Logo;
