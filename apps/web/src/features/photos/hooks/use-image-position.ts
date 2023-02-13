import { useCallback, useRef } from "react";
import type { Image } from "types";

export type Options = {
  gap?: number;
  columns?: 1 | 2;
  elementWidth?: number;
};

const useImagePositions = (images: Image[], options: Options = {}) => {
  const { gap, columns, elementWidth } = {
    columns: 2,
    gap: 20,
    elementWidth: 300,
    ...options,
  };
  const columnHeights = useRef<number[]>();

  const calculatePositions = useCallback(() => {
    const heights = Array.from({ length: columns }).fill(0) as number[];

    return images.map((image) => {
      const columnIndex = heights.indexOf(Math.min(...heights));
      const top = heights[columnIndex];
      const height = adjustHeight(image.width, image.height, elementWidth);
      heights[columnIndex] += height + gap;
      columnHeights.current = heights;

      return {
        top: 0,
        left: 0,
        transform: `translate(${
          columns === 1
            ? "0px"
            : columnIndex === 0
            ? "0px"
            : `calc(100% + ${gap}px)`
        },${top}px)`,
        width: columns === 1 ? "100%" : `calc(50% - ${gap / columns}px)`,
        height: `${height}px`,
      };
    });
  }, [images, gap, columns, elementWidth]);

  const getMaxHeight = useCallback(() => {
    if (images.length === 0) return;
    const heights = columnHeights.current;
    if (columns === 1) return heights[0] - gap;
    const maxHeight = heights[0] > heights[1] ? heights[0] : heights[1];
    return maxHeight - gap;
  }, [gap, columns, images.length]);

  return {
    getMaxHeight: getMaxHeight,
    positions: calculatePositions(),
  };
};

export default useImagePositions;

function adjustHeight(imageWidth: number, imageHeight: number, width: number) {
  const aspectRatio = imageWidth / imageHeight;
  return width / aspectRatio;
}
