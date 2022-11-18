import Image, { ImageProps } from "next/image";
import React from "react";

type Props = ImageProps;

const Photo = ({ className, ...props }: Props) => {
  return (
    <figure className={className}>
      <Image {...props} />
    </figure>
  );
};

export default Photo;
