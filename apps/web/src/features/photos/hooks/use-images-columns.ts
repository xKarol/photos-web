import type { Image as ImageType } from "@app/types";
import { useEffect, useState } from "react";
import { breakpoints } from "../../../styles/breakpoints";

// TODO import breakpoint union type
type Breakpoints = "sm" | "md" | "lg" | "xl" | "2xl";
type BreakpointColumns = { breakpoint: Breakpoints; amount: number }[];

// TODO return type based on screensColumns prop in tuple
export const useImagesColumns = (
  images: ImageType[],
  screensColumns: BreakpointColumns = [
    { breakpoint: "sm", amount: 1 },
    { breakpoint: "md", amount: 2 },
  ]
) => {
  const [columns, setColumns] = useState<ImageType[][][]>([]);

  useEffect(() => {
    const getColumnsData = (colsAmount: number, breakpoint: Breakpoints) => {
      const columnsItems = Array.from<ImageType[]>({ length: colsAmount }).map(
        () => []
      );
      for (const [index, image] of images.entries()) {
        const columnId = index % colsAmount;
        const imageHeight = calculateHeight(
          image.width,
          image.height,
          +breakpoints[breakpoint].replace("px", "")
        );
        columnsItems[columnId].push({ ...image, height: imageHeight });
      }
      return columnsItems;
    };

    const getBreakpointsColumns = () => {
      const breakpointCols = screensColumns.map((screen) => {
        return getColumnsData(screen.amount, screen.breakpoint);
      });
      return breakpointCols;
    };
    const data = getBreakpointsColumns();
    setColumns([...data]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return columns;
};

function calculateHeight(
  imageWidth: number,
  imageHeight: number,
  width: number
) {
  const aspectRatio = imageWidth / imageHeight;
  return width / aspectRatio;
}
