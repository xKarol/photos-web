import Link from "next/link";
import React from "react";
import { useMedia } from "react-use";
import { PhotoType } from "../../@types/photos";
import Photo from "./photo";

type Props = {
  columns?: number;
  photos?: PhotoType[];
} & Partial<React.ComponentProps<typeof Photo>>;

const PhotosColumns = ({ columns = 2, photos = [], ...props }: Props) => {
  const isMobile = useMedia("(max-width: 500px)", false);

  if (!photos.length) return <span>Cannot find photos</span>;
  return (
    <div className="flex space-x-2 sm:space-x-5 md:space-x-10 lg:space-x-20">
      {Array(isMobile ? 1 : columns)
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
              .map(({ id, src, alt, height, width, placeholder }) => (
                <Link key={id} href={`/${id}`}>
                  <Photo
                    {...props}
                    src={src}
                    alt={alt}
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
