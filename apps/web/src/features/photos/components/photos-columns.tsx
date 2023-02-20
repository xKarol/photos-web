import Link from "next/link";
import React from "react";
import { useWindowSize } from "react-use";
import type { Image as ImageType } from "types";
import { getImageUrl } from "../../../utils/misc";
import useImagePositions from "../hooks/use-image-position";
import Photo from "./photo";
import {
  calculateContainerPadding,
  getScreenName,
} from "../../../utils/screen";
import { getImagePlaceholder } from "../../../utils/placeholder";

type Props = {
  photos?: ImageType[];
} & React.ComponentPropsWithoutRef<"div">;

const PhotosColumns = ({ photos = [], ...props }: Props) => {
  const { width } = useWindowSize(500);
  const screenName = getScreenName(width);
  const isOneColumn = screenName === "sm";
  const gap = 50;

  const { positions, getMaxHeight } = useImagePositions(photos, {
    gap: gap,
    columns: isOneColumn ? 1 : 2,
    elementWidth: isOneColumn
      ? width - calculateContainerPadding(width)
      : (width - calculateContainerPadding(width)) / 2,
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
