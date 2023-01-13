import clsx from "clsx";
import Link from "next/link";
import React from "react";
import {
  IoLogoInstagram,
  IoLogoPinterest,
  IoLogoYoutube,
} from "react-icons/io";

type Props = React.ComponentPropsWithoutRef<"section">;

const Socials = ({ className, ...rest }: Props) => {
  return (
    <section
      className={clsx(
        "flex items-center gap-5 text-font text-3xl [&_>*]:transition-colors [&_>*:hover]:opacity-50",
        className
      )}
      {...rest}
    >
      <Link href="/">
        <IoLogoInstagram />
      </Link>
      <Link href="/">
        <IoLogoYoutube />
      </Link>
      <Link href="/">
        <IoLogoPinterest />
      </Link>
    </section>
  );
};

export default Socials;
