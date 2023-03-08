import type { ImageProps } from "next/image";
import React from "react";
import Image from "next/image";
import { getImageUrl } from "../../utils/misc";
import { getImagePlaceholder } from "../../utils/placeholder";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type Props = { id: string } & PartialBy<ImageProps, "src">;

const Photo = ({ id, alt, ...props }: Props) => {
  return (
    <Image
      src={getImageUrl(id)}
      alt={alt}
      placeholder="blur"
      blurDataURL={getImagePlaceholder(id)}
      {...props}
    />
  );
};

export default Photo;
