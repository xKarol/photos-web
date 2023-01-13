import React from "react";
import clsx from "clsx";
import Image, { type ImageProps } from "next/image";

type Props = {
  caption: string;
} & Pick<ImageProps, "src" | "alt" | "blurDataURL"> &
  React.ComponentPropsWithoutRef<"figure">;

const ImageCaption = ({
  caption,
  alt,
  src,
  blurDataURL,
  className,
  ...rest
}: Props) => {
  return (
    <figure className={clsx("relative", className)} {...rest}>
      <Image
        alt={alt}
        src={src}
        blurDataURL={blurDataURL}
        placeholder="blur"
        style={{ objectFit: "cover" }}
        fill
      />
      <figcaption className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase text-2xl font-semibold tracking-widest text-center bg-white px-5 py-2">
        {caption}
      </figcaption>
    </figure>
  );
};

export default ImageCaption;
