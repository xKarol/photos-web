import { faker } from "@faker-js/faker";
import { render, renderHook } from "@testing-library/react";
import type { Image } from "@app/types";
import useImagePositions from "../hooks/use-image-position";
import { getFakeImageData, getMany } from "../../../tests/utils";

const CONTAINER_WIDTH = faker.number.int({ min: 500, max: 2000 });

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

  it.skip("getMaxHeight function should return valid height in one column", () => {
    const data = generateImagesData();
    const options = {
      gap: 50,
      columns: 1,
    } as const;
    const { result } = setup(data, options);
    const max = calcMaxHeight(data, options.gap, options.columns);
    expect(result.current.getMaxHeight()).toBeGreaterThanOrEqual(max);
  });

  it.skip("getMaxHeight function should return valid height when two columns are rendered", () => {
    const data = generateImagesData();
    const options = {
      gap: 50,
      columns: 2,
    } as const;
    const { result } = setup(data, options);

    const max = calcMaxHeight(data, options.gap, options.columns);
    expect(result.current.getMaxHeight()).toBeGreaterThanOrEqual(max);
  });

  it("should contain valid gap", () => {
    const gap = 50;
    const { result } = setup(generateImagesData(), { gap });
    for (const { width, transform } of result.current.positions) {
      expect(width.includes(`${gap / 2}`)).toBe(true);
      expect(
        transform.includes(`+ ${gap}px`) || transform.includes("translate(0px,")
      ).toBe(true);
    }
  });

  // TODO sometimes failing
  it.skip("columns should affect the maximum height", () => {
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

  it("horizontal and vertical gap should be valid", () => {
    const gap = 50;
    const data = generateImagesData();
    const { result } = setup(data, { gap });

    // horizontal
    expect(result.current.positions[0].transform).toMatch(",0px)");
    expect(result.current.positions[1].transform).toMatch(",0px)");
    expect(result.current.positions[0].width).toMatch(`50% - ${gap / 2}px`);
    expect(result.current.positions[1].width).toMatch(`50% - ${gap / 2}px`);
    expect(result.current.positions[0].transform).toMatch("translate(0px,");
    expect(result.current.positions[1].transform).toMatch(
      `calc(100% + ${gap}px),`
    );
    // vertical
    expect(result.current.positions[2].transform).not.toMatch(",0px)");
    expect(result.current.positions[3].transform).not.toMatch(",0px)");
  });

  it("all elements should have left: 0px value when max columns = 1", () => {
    const { result } = setup(generateImagesData(), { columns: 1 });

    for (const position of result.current.positions) {
      expect(position.left).toBe("0px");
    }
  });

  it("not all elements should have the same column", () => {
    const data = generateImagesData();
    const options = {
      gap: 20,
      columns: 2,
    } as const;
    const { result } = setup(data, options);

    const columns = [[], []];
    const LEFT_COLUMN = 0;
    const RIGHT_COLUMN = 1;

    // @ts-expect-error
    for (const [index, position] of result.current.positions.entries()) {
      if (position.transform.includes("translate(0px,"))
        columns[LEFT_COLUMN].push(index);
      else columns[RIGHT_COLUMN].push(index);
    }
    expect(columns[LEFT_COLUMN].length).toBeLessThan(data.length);
    expect(columns[RIGHT_COLUMN].length).toBeLessThan(data.length);
  });
});

type ImageProp = Parameters<typeof useImagePositions>[0][0];

function generateImagesData(): ImageProp[] {
  return getMany(getFakeImageData, { min: 10, max: 25 });
}

function calcMaxHeight(data: Image[], gap: number, columns: number) {
  return (
    data
      .map(({ height, width }) => CONTAINER_WIDTH / (width / height) + gap)
      .reduce((prev, curr) => prev + curr) / columns
  );
}
