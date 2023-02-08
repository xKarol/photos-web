import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import React from "react";

type Props = ImageProps;

const Photo = ({ className, alt, children, ...props }: Props) => {
  return (
    <figure>
      <Image
        className={clsx("relative select-none", className)}
        placeholder="blur"
        style={{
          width: "100%",
          height: "auto",
        }}
        alt={alt}
        {...props}
      />
      {children}
    </figure>
  );
};

export default Photo;
