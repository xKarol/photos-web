import Link from "next/link";
import React from "react";
import type { Image as ImageType } from "types";
import Image from "next/image";
import { getImageUrl } from "../../../utils/misc";
import useImagePositions from "../hooks/use-image-position";
import { getImagePlaceholder } from "../../../utils/placeholder";
import useScreen from "../../../hooks/use-screen";

type Props = {
  photos?: ImageType[];
} & React.ComponentPropsWithoutRef<"div">;

const PhotosColumns = ({ photos = [], ...props }: Props) => {
  const isMobile = useScreen("sm");

  const { positions, getMaxHeight, ref } = useImagePositions(photos, {
    gap: 50,
    columns: isMobile ? 1 : 2,
  });

  return (
    <div
      className="relative w-full"
      style={{ height: getMaxHeight() }}
      ref={ref}
      {...props}
    >
      {photos.map(({ id, alt }, index) => (
        <Link
          key={id}
          href={`?selected=${index + 1}`}
          shallow={true}
          className="absolute"
          style={positions[index]}
        >
          <Image
            src={getImageUrl(id)}
            alt={alt}
            placeholder="blur"
            blurDataURL={getImagePlaceholder(id)}
            fill
            sizes="(max-width: 768px) 95vw,
              40vw"
            style={{ objectFit: "cover" }}
          />
        </Link>
      ))}
    </div>
  );
};

export default PhotosColumns;
