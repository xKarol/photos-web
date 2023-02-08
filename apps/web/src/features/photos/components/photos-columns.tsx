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
  });

  return (
    <div
      className="relative w-100"
      style={{ height: getMaxHeight() }}
      {...props}
    >
      {photos.map(({ id, alt, width, height, placeholder }, index) => (
        <Link
          key={id}
          href={`/photo/${id}`}
          className="absolute"
          style={{
            height: height + "px",
            ...positions[index],
          }}
        >
          <Photo
            src={getImageUrl(id)}
            alt={alt}
            width={width}
            height={height}
            blurDataURL={placeholder}
            className="absolute"
          />
        </Link>
        // <div
        //   key={index}
        //   className="bg-font absolute"
        //   style={{
        //     height: image.height + "px",
        //     ...positions[index],
        //   }}
        // >
        //   {index}
        // </div>
      ))}
    </div>
  );
};

export default PhotosColumns;
