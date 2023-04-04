import clsx from "clsx";
import Link from "next/link";
import React from "react";
import socialMediaLinks from "../constants/social-media-links";

type Props = React.ComponentPropsWithoutRef<"section">;

const SocialLinks = ({ className, ...rest }: Props) => {
  return (
    <section
      className={clsx(
        "flex items-center gap-5 text-3xl text-black [&_>*:hover]:opacity-50 [&_>*]:transition-colors",
        className
      )}
      {...rest}
    >
      {socialMediaLinks.map(({ name, url, IconElement }) => (
        <Link key={name} href={url} aria-label={`Link to our ${name} page`}>
          <IconElement />
        </Link>
      ))}
    </section>
  );
};

export default SocialLinks;
