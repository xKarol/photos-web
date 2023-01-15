import Link from "next/link";
import React from "react";
import { useMedia } from "react-use";
import type { Image } from "types";
import { getImageUrl } from "../../../utils/misc";
import Photo from "./photo";

type Props = {
  columns?: number;
  photos?: Image[];
} & Partial<React.ComponentProps<typeof Photo>>;

const PhotosColumns = ({ columns = 2, photos = [], ...props }: Props) => {
  const isMobile = useMedia("(max-width: 500px)", false);

  if (photos.length === 0) return <span>Cannot find photos</span>;
  return (
    <div
      className="flex space-x-2 sm:space-x-5 md:space-x-10 lg:space-x-20"
      {...props}
    >
      {Array.from({ length: isMobile ? 1 : columns })
        .fill(null)
        .map((_, column) => (
          <div
            className="w-full flex flex-col space-y-2 sm:space-y-5 md:space-y-10 lg:space-y-20"
            key={column}
          >
            {photos
              .slice(
                column * (photos.length / columns),
                column * (photos.length / columns) + photos.length / columns
              )
              .map(({ id, alt, height, width, placeholder }) => (
                <Link key={id} href={`/photo/${encodeURIComponent(id)}`}>
                  <Photo
                    src={getImageUrl(id)}
                    alt={alt || ""} //TODO fix alt optional type
                    width={width}
                    height={height}
                    blurDataURL={placeholder}
                  />
                </Link>
              ))}
          </div>
        ))}
    </div>
  );
};

export default PhotosColumns;
