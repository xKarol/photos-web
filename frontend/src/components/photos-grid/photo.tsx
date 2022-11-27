import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import React from "react";

type Props = ImageProps;

const Photo = ({ className, ...props }: Props) => {
  return (
    <figure className={className}>
      <Image
        className={clsx("relative select-none", className)}
        placeholder="blur"
        style={{
          width: "100%",
          height: "auto",
        }}
        {...props}
      />
    </figure>
  );
};

export default Photo;
