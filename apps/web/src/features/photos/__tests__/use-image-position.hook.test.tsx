import { faker } from "@faker-js/faker";
import { render, renderHook } from "@testing-library/react";
import type { Image } from "types";
import useImagePositions from "../hooks/use-image-position";

const CONTAINER_WIDTH = faker.datatype.number({ min: 500, max: 2000 });

const setup = (...args: Parameters<typeof useImagePositions>) => {
  const [images, options] = args;
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const hookData = renderHook(() => useImagePositions(images, options));
  render(
    <div
      ref={hookData.result.current.ref}
      style={{ width: CONTAINER_WIDTH, height: "500px" }}
    ></div>
  );
  return hookData;
};

describe("useImagePosition hook", () => {
  it("should return empty array of positions", () => {
    const { result } = setup([]);
    expect(result.current.positions).toMatchObject([]);
  });

  it("getMaxHeight function should return undefined when no data was provided", () => {
    const { result } = setup([]);
    expect(result.current.getMaxHeight()).toBe(undefined);
  });

  it("should return array of objects positions", () => {
    const { result } = setup(generateImagesData());
    expect(result.current.positions).not.toMatchObject([]);
  });

  it("positions should contain valid properties", () => {
    const { result } = setup(generateImagesData());

    for (const position of result.current.positions) {
      expect(position).toMatchObject({
        top: expect.any(String),
        left: expect.any(String),
        width: expect.any(String),
      });
    }
  });

  it.failing(
    "getMaxHeight function should return valid height in one column",
    () => {
      const data = generateImagesData();
      const options = {
        gap: 50,
        columns: 1,
      } as const;
      const { result } = setup(data, options);
      const max = calcMaxHeight(data, options.gap, options.columns);
      expect(result.current.getMaxHeight()).toBeGreaterThanOrEqual(max);
    }
  );

  it.failing(
    "getMaxHeight function should return valid height in two columns",
    () => {
      const data = generateImagesData();
      const options = {
        gap: 50,
        columns: 2,
      } as const;
      const { result } = setup(data, options);

      const max = calcMaxHeight(data, options.gap, options.columns);
      expect(result.current.getMaxHeight()).toBeGreaterThanOrEqual(max);
    }
  );

  it("should contain valid gap", () => {
    const gap = 50;
    const { result } = setup(generateImagesData(), { gap });
    for (const { width, left } of result.current.positions) {
      expect(width.includes(`${gap / 2}`)).toBe(true);
      expect(left.includes(`${gap / 2}`) || left.includes("0px")).toBe(true);
    }
  });

  it("columns should affect the maximum height", () => {
    const data = generateImagesData();
    const { result: twoCol, unmount } = setup(data, { columns: 2 });
    const twoColumnsHeight = twoCol.current.getMaxHeight();
    unmount();
    const { result } = setup(data, { columns: 1 });
    expect(result.current.getMaxHeight()).toBeGreaterThanOrEqual(
      twoColumnsHeight
    );
  });

  it("gap should affect the maximum height", () => {
    const data = generateImagesData();
    const { result: twoColResult, unmount } = setup(data, { gap: 50 });
    const initialGapHeight = twoColResult.current.getMaxHeight();
    unmount();

    const { result } = setup(data, { gap: 25 });
    expect(result.current.getMaxHeight()).toBeLessThan(initialGapHeight);
  });

  it.failing("horizontal and vertical gap should be valid", () => {
    const gap = 50;
    const data = generateImagesData();
    const { result } = setup(data, { gap });

    // horizontal
    expect(result.current.positions[0].top).toBe("0px");
    expect(result.current.positions[1].top).toBe("0px");
    expect(result.current.positions[0].left).toBe("0px");
    expect(result.current.positions[0].width).toMatch(`50% - ${gap / 2}px`);
    expect(result.current.positions[1].left).toMatch(`50% + ${gap / 2}px`);
    // vertical
    expect(result.current.positions[2].top).toBe(data[0].height + gap + "px");
    expect(result.current.positions[3].top).toBe(data[1].height + gap + "px");
    expect(result.current.positions[2].left).toBe("0px");
    expect(result.current.positions[3].left).toMatch(`50% + ${gap / 2}px`);
  });

  it("all elements should have left: 0px value when max columns = 1", () => {
    const { result } = setup(generateImagesData(), { columns: 1 });

    for (const position of result.current.positions) {
      expect(position.left).toBe("0px");
    }
  });

  it.failing(
    "elements should have valid left value depending on the side of the column",
    () => {
      const options = {
        gap: 20,
        columns: 2,
      } as const;
      const { result } = setup(generateImagesData(), options);

      // @ts-expect-error
      for (const [index, position] of result.current.positions.entries()) {
        expect(position.left).toBe(
          index % options.columns === 0
            ? "0px"
            : `calc(50% + ${options.gap / 2}px)`
        );
      }
    }
  );
});

type ImageProp = Parameters<typeof useImagePositions>[0][0];

function generateImagesData(): ImageProp[] {
  return Array.from(
    { length: faker.datatype.number({ min: 10, max: 25 }) },
    generateImageData
  );
}

function generateImageData(
  height: number = faker.datatype.number({ min: 500, max: 1200 })
): ImageProp {
  return {
    id: faker.database.mongodbObjectId(),
    alt: faker.lorem.words(2),
    createdAt: faker.date.past(1),
    updatedAt: faker.date.recent(),
    height,
    width: faker.datatype.number({ min: 600, max: 800 }),
    mimeType: "webp",
    src: faker.image.imageUrl(),
    placeholder: "...",
  };
}

function calcMaxHeight(data: Image[], gap: number, columns: number) {
  return (
    data
      .map(({ height, width }) => CONTAINER_WIDTH / (width / height) + gap)
      .reduce((prev, curr) => prev + curr) / columns
  );
}
