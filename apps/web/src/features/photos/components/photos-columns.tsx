import type { Image as ImageType } from "@app/types";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import useLightbox from "../../../hooks/use-lightbox";
import { useImagesColumns } from "../hooks/use-images-columns";

type Props = {
  photos?: ImageType[];
};

const PhotosColumns = ({ photos = [] }: Props) => {
  const [mobileColumns = [], desktopColumns = []] = useImagesColumns(photos);

  return (
    <>
      <RenderColumns
        columns={mobileColumns}
        className="flex md:hidden"
        gap="32px"
      />
      <RenderColumns
        columns={desktopColumns}
        className="hidden md:flex"
        gap="38px"
      />
    </>
  );
};

export default PhotosColumns;

const RenderColumns = ({
  columns,
  className,
  gap = "50px",
  ...rest
}: {
  columns: (ImageType & { initialIndex: number })[][];
  gap?: string;
} & React.ComponentPropsWithoutRef<"div">) => {
  const { getLinkProps } = useLightbox();

  return (
    <div style={{ "--gap": gap } as unknown}>
      <div
        className={clsx("relative flex w-full space-x-[--gap]", className)}
        {...rest}
      >
        {columns.map((columnItems, columnIndex) => (
          <div
            key={columnIndex}
            className="flex flex-1 flex-col space-y-[--gap]"
          >
            {columnItems.map(
              ({ id, src, height, alt, placeholder, initialIndex }) => (
                <Link
                  key={id}
                  {...getLinkProps(initialIndex)}
                  className="w-full"
                  style={{ height }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 768px) 95vw, 40vw"
                      placeholder="blur"
                      blurDataURL={placeholder}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
