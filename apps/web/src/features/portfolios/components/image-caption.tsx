import React from "react";
import clsx from "clsx";
import { Photo } from "../../../components/photo";

type Props = {
  caption: string;
} & React.ComponentProps<typeof Photo>;

const ImageCaption = ({ caption, id, className, ...rest }: Props) => {
  return (
    <figure className={clsx("relative", className)}>
      <Photo id={id} style={{ objectFit: "cover" }} fill {...rest} />
      <figcaption className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-5 py-2 text-center text-2xl font-semibold uppercase tracking-widest">
        {caption}
      </figcaption>
    </figure>
  );
};

export default ImageCaption;
