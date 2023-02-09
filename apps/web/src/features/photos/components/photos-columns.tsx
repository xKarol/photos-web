import Link from "next/link";
import React, { useEffect, useRef } from "react";
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
  const elements = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    elements.current = elements.current.slice(0, photos.length);
  }, [photos]);

  const { positions, getMaxHeight } = useImagePositions(elements.current, {
    gap: 50,
    columns: isMobile ? 1 : 2,
  });

  return (
    <div
      className="relative w-full"
      style={{ height: getMaxHeight() }}
      {...props}
    >
      {photos.map(({ id, alt, width, height, placeholder }, index) => (
        <Link
          key={id}
          href={`/photo/${id}`}
          className="absolute"
          style={{
            visibility: elements.current.length === 0 ? "hidden" : "visible",
            height: elements.current[index]?.height + "px",
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
            ref={(el) => (elements.current[index] = el)}
          />
        </Link>
      ))}
    </div>
  );
};

export default PhotosColumns;
