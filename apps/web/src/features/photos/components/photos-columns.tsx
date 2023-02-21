import Link from "next/link";
import React from "react";
// import { useWindowSize } from "react-use";
import type { Image as ImageType } from "types";
import { getImageUrl } from "../../../utils/misc";
import useImagePositions from "../hooks/use-image-position";
import Photo from "./photo";
// import { calculateContainerPadding } from "../../../utils/screen";
import { getImagePlaceholder } from "../../../utils/placeholder";
import useScreen from "../../../hooks/use-screen";

type Props = {
  photos?: ImageType[];
} & React.ComponentPropsWithoutRef<"div">;

const PhotosColumns = ({ photos = [], ...props }: Props) => {
  // const { width } = useWindowSize(500);
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
          href={`/photo/${id}`}
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
