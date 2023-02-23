import { faker } from "@faker-js/faker";
import { renderHook } from "@testing-library/react";
import useImagePositions from "../hooks/use-image-position";

describe("useImagePosition hook", () => {
  it("should return empty array of positions", () => {
    const { result } = renderHook(() => useImagePositions([]));
    expect(result.current.positions).toMatchObject([]);
  });

  // TODO fix skipped tests
  it.skip("getMaxHeight function should return undefined when no data was provided", () => {
    const { result } = renderHook(() => useImagePositions([]));
    expect(result.current.getMaxHeight()).toBe(undefined);
  });

  it("should return array of objects positions", () => {
    const { result } = renderHook(() =>
      useImagePositions(generateImagesData())
    );
    expect(result.current.positions).not.toMatchObject([]);
  });

  it("positions should contain valid properties", () => {
    const { result } = renderHook(() =>
      useImagePositions(generateImagesData())
    );
    for (const position of result.current.positions) {
      expect(position).toMatchObject({
        top: expect.any(String),
        left: expect.any(String),
        width: expect.any(String),
      });
    }
  });

  it.skip("getMaxHeight function should return valid height", () => {
    const data = generateImagesData();
    const { result } = renderHook(() => useImagePositions(data));
    const max = data
      .map(({ height }) => height)
      .reduce((prev, curr) => prev + curr);
    const MAX_COLUMNS = 2;
    expect(result.current.getMaxHeight()).toBeGreaterThanOrEqual(
      max / MAX_COLUMNS
    );
  });

  it("should contain valid gap", () => {
    const gap = 50;
    const { result } = renderHook(() =>
      useImagePositions(generateImagesData(), { gap })
    );
    for (const { width, left } of result.current.positions) {
      expect(width.includes(`${gap / 2}`)).toBe(true);
      expect(left.includes(`${gap / 2}`) || left.includes("0px")).toBe(true);
    }
  });

  it("columns should affect the maximum height", () => {
    const data = generateImagesData();
    const { result: twoCol } = renderHook(() =>
      useImagePositions(data, { columns: 2 })
    );
    const twoColumnsHeight = twoCol.current.getMaxHeight();

    const { result } = renderHook(() =>
      useImagePositions(data, { columns: 1 })
    );

    expect(result.current.getMaxHeight()).toBeGreaterThanOrEqual(
      twoColumnsHeight
    );
  });

  it("gap should affect the maximum height", () => {
    const data = generateImagesData();
    const { result: twoCol } = renderHook(() =>
      useImagePositions(data, { gap: 50 })
    );
    const initialGapHeight = twoCol.current.getMaxHeight();

    const { result } = renderHook(() => useImagePositions(data, { gap: 25 }));

    expect(result.current.getMaxHeight()).toBeLessThan(initialGapHeight);
  });

  it.skip("horizontal and vertical gap should be valid", () => {
    const gap = 50;
    const data = generateImagesData();
    const { result } = renderHook(() => useImagePositions(data, { gap }));

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
    const { result } = renderHook(() =>
      useImagePositions(generateImagesData(), { columns: 1 })
    );

    for (const position of result.current.positions) {
      expect(position.left).toBe("0px");
    }
  });

  it.skip("elements should have valid left value depending on the side of the column", () => {
    const gap = 20;
    const { result } = renderHook(() =>
      useImagePositions(generateImagesData(), { columns: 2, gap })
    );

    // @ts-expect-error
    for (const [index, position] of result.current.positions.entries()) {
      expect(position.left).toBe(
        index % 2 ? `calc(50% + ${gap / 2}px)` : "0px"
      );
    }
  });
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
    type: "DEFAULT",
  };
}
