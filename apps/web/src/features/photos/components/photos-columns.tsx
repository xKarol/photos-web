import Link from "next/link";
import React from "react";
import { useWindowSize } from "react-use";
import type { Image as ImageType } from "types";
import { getImageUrl } from "../../../utils/misc";
import useImagePositions from "../hooks/use-image-position";
import Photo from "./photo";
import { getScreenName } from "../../../utils/screen";

type Props = {
  photos?: ImageType[];
} & React.ComponentPropsWithoutRef<"div">;

const DEFAULT_ELEMENT_WIDTH = 520;
const MOBILE_PADDING = 32;

const PhotosColumns = ({ photos = [], ...props }: Props) => {
  const { width } = useWindowSize();
  const screenName = getScreenName(width);
  console.log(screenName);

  const { positions, getMaxHeight } = useImagePositions(photos, {
    gap: 50,
    columns: screenName === "sm" ? 1 : 2,
    elementWidth:
      screenName === "sm" ? width - MOBILE_PADDING : DEFAULT_ELEMENT_WIDTH,
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
