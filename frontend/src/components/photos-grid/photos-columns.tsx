import React from "react";
import { PhotoType } from "../../@types/photos";
import Photo from "./photo";

type Props = {
  columns?: number;
  photos: PhotoType[];
} & Partial<React.ComponentProps<typeof Photo>>;

const PhotosColumns = ({ columns = 2, photos, ...props }: Props) => {
  return (
    <div className="flex space-x-20">
      {Array(columns)
        .fill(null)
        .map((_, column) => (
          <div className="w-full flex flex-col space-y-20">
            {photos
              .slice(
                column * (photos.length / columns),
                column * (photos.length / columns) + photos.length / columns
              )
              .map(({ id, src, alt, height, width, placeholder }) => (
                <Photo
                  key={id}
                  {...props}
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  blurDataURL={placeholder}
                />
              ))}
          </div>
        ))}
    </div>
  );
};

export default PhotosColumns;
