import Link from "next/link";
import React from "react";
import { useMedia } from "react-use";
import type { Image as ImageType } from "types";
import { getImageUrl } from "../../../utils/misc";
import useImagePositions from "../hooks/use-image-position";
import Photo from "./photo";

type Props = {
  photos?: ImageType[];
} & React.ComponentPropsWithoutRef<"div">;

const PhotosColumns = ({ photos = [], ...props }: Props) => {
  const isMobile = useMedia("(max-width: 500px)", false);

  const { positions, getMaxHeight } = useImagePositions(photos, {
    gap: 50,
    columns: isMobile ? 1 : 2,
    elementWidth: 526, //TODO calc based on screen width
  });

  return (
    <div
      className="relative w-full"
      style={{ height: getMaxHeight() }}
      {...props}
    >
      {photos.map(({ id, alt, placeholder }, index) => (
        <Link
          key={id}
          href={`/photo/${id}`}
          className="absolute"
          style={positions[index]}
        >
          <Photo
            src={getImageUrl(id)}
            alt={alt}
            blurDataURL={placeholder}
            style={{ objectFit: "cover" }}
            fill
          />
        </Link>
      ))}
    </div>
  );
};

export default PhotosColumns;
