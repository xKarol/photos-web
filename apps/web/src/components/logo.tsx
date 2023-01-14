import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import React from "react";
import logoSrc from "../../public/assets/logo.svg";
import { ROUTE_HOME } from "../constants/routes";

type Props = {
  href?: string;
} & Partial<ImageProps>;

const Logo = ({ href, ...rest }: Props) => {
  return (
    <figure className="w-[40px]">
      <Link href={href || ROUTE_HOME}>
        <Image {...rest} src={logoSrc} alt="logo" />
      </Link>
    </figure>
  );
};

export default Logo;
