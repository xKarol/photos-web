import clsx from "clsx";
import Image from "next/image";
import React from "react";

type Props = {
  caption: string;
} & React.ComponentProps<typeof Image>;

const ImageCaption = ({ caption, alt, className, ...rest }: Props) => {
  return (
    <figure className={clsx("relative", className)}>
      <Image alt={alt} style={{ objectFit: "cover" }} fill {...rest} />
      <figcaption className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-5 py-2 text-center text-2xl font-semibold uppercase tracking-widest">
        {caption}
      </figcaption>
    </figure>
  );
};

export default ImageCaption;
