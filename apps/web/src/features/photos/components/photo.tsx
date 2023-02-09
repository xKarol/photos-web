import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import React, { forwardRef } from "react";

type Props = ImageProps;

const PhotoComponent = forwardRef<HTMLImageElement, Props>(
  ({ className, alt, children, ...props }, ref) => {
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
          ref={ref}
        />
        {children}
      </figure>
    );
  }
);
PhotoComponent.displayName = "Photo";

export default PhotoComponent;
