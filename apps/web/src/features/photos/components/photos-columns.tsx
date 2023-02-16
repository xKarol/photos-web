import Link from "next/link";
import React from "react";
import { useMedia, useWindowSize } from "react-use";
import type { Image as ImageType } from "types";
import { getImageUrl } from "../../../utils/misc";
import useImagePositions from "../hooks/use-image-position";
import Photo from "./photo";

type Props = {
  photos?: ImageType[];
} & React.ComponentPropsWithoutRef<"div">;

const DEFAULT_ELEMENT_WIDTH = 520;
const MOBILE_PADDING = 32;

const PhotosColumns = ({ photos = [], ...props }: Props) => {
  const isMobile = useMedia("(max-width: 500px)", false);
  const { width } = useWindowSize(DEFAULT_ELEMENT_WIDTH);

  const { positions, getMaxHeight } = useImagePositions(photos, {
    gap: 50,
    columns: isMobile ? 1 : 2,
    elementWidth: isMobile ? width - MOBILE_PADDING : DEFAULT_ELEMENT_WIDTH,
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
