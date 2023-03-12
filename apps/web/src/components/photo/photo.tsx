import type { ImageProps } from "next/image";
import React, { useState } from "react";
import Image from "next/image";
import { getImageUrl } from "../../utils/misc";
import { getImagePlaceholder } from "../../utils/placeholder";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type Props = { id: string } & PartialBy<ImageProps, "src">;

const Photo = ({ id, alt, ...props }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { width = "100%", height = "100%" } = props;
  return (
    <div
      className="relative"
      style={{
        width,
        height,
        ...(!isLoaded && {
          backgroundImage: `url("${getImagePlaceholder(id)}")`,
        }),
      }}
    >
      <Image
        src={getImageUrl(id)}
        alt={alt}
        {...props}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default Photo;
