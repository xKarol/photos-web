import Link from "next/link";
import React from "react";
import type { Image as ImageType } from "types";
import { getImageUrl } from "../../../utils/misc";
import useImagePositions from "../hooks/use-image-position";
import Photo from "./photo";
import { getImagePlaceholder } from "../../../utils/placeholder";
import useScreen from "../../../hooks/use-screen";

type Props = {
  photos?: ImageType[];
} & React.ComponentPropsWithoutRef<"div">;

const PhotosColumns = ({ photos = [], ...props }: Props) => {
  const isMobile = useScreen("sm");

  const { positions, getMaxHeight } = useImagePositions(photos, {
    gap: 50,
    columns: isMobile ? 1 : 2,
    elementWidth: 500,
  });

  return (
    <div
      className="relative w-full"
      style={{ height: getMaxHeight() }}
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
          <Photo
            src={getImageUrl(id)}
            alt={alt}
            blurDataURL={getImagePlaceholder(id)}
            style={{ objectFit: "cover" }}
            fill
          />
        </Link>
      ))}
    </div>
  );
};

export default PhotosColumns;
