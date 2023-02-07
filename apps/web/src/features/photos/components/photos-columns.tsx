import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useMedia } from "react-use";
import type { Image as ImageType } from "types";
import { getImageUrl } from "../../../utils/misc";
import useImagePositions from "../hooks/use-image-position";
import Photo from "./photo";

type Props = {
  columns?: number;
  photos?: ImageType[];
} & Partial<React.ComponentProps<typeof Photo>>;

const PhotosColumns = ({ columns = 2, photos = [], ...props }: Props) => {
  const isMobile = useMedia("(max-width: 500px)", false);

  const { positions, getMaxHeight } = useImagePositions(photos, {
    gap: 50,
    columns: isMobile ? 1 : 2,
  });

  if (photos.length === 0) return <span>Cannot find photos</span>;
  return (
    <div className="relative w-100" style={{ height: getMaxHeight() }}>
      {photos.map(({ id, alt, width, height, placeholder }, index) => (
        <Link
          key={id}
          href={`/photo/${encodeURIComponent(id)}`}
          className="absolute"
          style={{
            height: height + "px",
            ...positions[index],
          }}
        >
          <Image
            src={getImageUrl(id)}
            alt={alt}
            className={"relative select-none"}
            placeholder="blur"
            blurDataURL={placeholder}
            width={width}
            height={height}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          {/* <Photo
            src={getImageUrl(id)}
            alt={alt}
            width={width}
            height={height}
            blurDataURL={placeholder}
            // className="absolute"
          /> */}
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
  // return (
  //   <div
  //     className="flex space-x-2 sm:space-x-5 md:space-x-10 lg:space-x-20"
  //     {...props}
  //   >
  //     {Array.from({ length: isMobile ? 1 : columns })
  //       .fill(null)
  //       .map((_, column) => (
  //         <div
  //           className="w-full flex flex-col space-y-2 sm:space-y-5 md:space-y-10 lg:space-y-20"
  //           key={column}
  //         >
  //           {photos
  //             .slice(
  //               column * (photos.length / columns),
  //               column * (photos.length / columns) + photos.length / columns
  //             )
  //             .map(({ id, alt, height, width, placeholder }) => (
  //               <Link key={id} href={`/photo/${encodeURIComponent(id)}`}>
  //                 <Photo
  //                   src={getImageUrl(id)}
  //                   alt={alt}
  //                   width={width}
  //                   height={height}
  //                   blurDataURL={placeholder}
  //                 />
  //               </Link>
  //             ))}
  //         </div>
  //       ))}
  //   </div>
  // );
};

export default PhotosColumns;
