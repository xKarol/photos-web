import Link from "next/link";
import React from "react";
import { PhotoType } from "../../@types/photos";
import Photo from "./photo";

type Props = {
  columns?: number;
  photos?: PhotoType[];
} & Partial<React.ComponentProps<typeof Photo>>;

const PhotosColumns = ({ columns = 2, photos = [], ...props }: Props) => {
  if (!photos.length) return <span>Cannot find photos</span>;
  return (
    <div className="flex space-x-20">
      {Array(columns)
        .fill(null)
        .map((_, column) => (
          <div className="w-full flex flex-col space-y-20" key={column}>
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
