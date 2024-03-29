/* eslint-disable jest/no-mocks-import */
import type { Photo } from "@app/types";

import { faker } from "@faker-js/faker";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import "../../__mocks__/intersection-observer";
import "../../__mocks__/next-image";
import { getFakeImageData } from "../../tests/utils";
import Lightbox from "./index";

const photos: Photo.ApiResponse["findOne"][] = Array.from(
  { length: faker.number.int({ min: 5, max: 25 }) },
  getFakeImageData
);

type LightboxProps = React.ComponentProps<typeof Lightbox>;
type Setup = { show?: boolean } & Partial<
  Omit<LightboxProps, "isOpen" | "setIsOpen">
>;

const getInitialIndex = (index: number) => {
  if (!photos[index]) throw new Error("Invalid photo index");
  return index;
};

const setup = ({
  show = true,
  photos = [],
  initialIndex = 0,
  ...props
}: Setup = {}) => {
  const Wrapper = () => {
    const [isOpen, setIsOpen] = useState(show);
    return (
      <Lightbox
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        photos={photos}
        initialIndex={initialIndex}
        {...props}
      />
    );
  };

  return render(<Wrapper />);
};

describe("Lightbox", () => {
  it("close button should be visible", () => {
    setup();
    const closeButton = screen.getByLabelText(/close/i);
    expect(closeButton).toBeInTheDocument();
  });

  it("dialog should not be visible when property isOpen = false", () => {
    setup({ show: false });
    const dialogElement = screen.queryByRole("dialog");
    expect(dialogElement).not.toBeInTheDocument();
  });

  it("next button should not be visible when current index is last", () => {
    setup({ initialIndex: getInitialIndex(photos.length - 1) });

    const nextButton = screen.queryByLabelText("next image");
    expect(nextButton).not.toBeInTheDocument();
  });

  it("prev button should not be visible when current index is first", () => {
    setup();

    const prevButton = screen.queryByLabelText("previous image");
    expect(prevButton).not.toBeInTheDocument();
  });

  it("next and prev buttons should not be visible when photos length = 0", () => {
    setup();

    const nextButton = screen.queryByLabelText("next image");
    expect(nextButton).not.toBeInTheDocument();

    const prevButton = screen.queryByLabelText("previous image");
    expect(prevButton).not.toBeInTheDocument();
  });

  it("dialog should close when user click to close button", async () => {
    setup();

    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();

    const { click } = userEvent.setup();
    const closeButton = screen.getByLabelText(/close/i);
    await click(closeButton);

    expect(dialogElement).not.toBeInTheDocument();
  });

  it("dialog should not close when user click to dialog overlay", async () => {
    setup();

    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();

    const overlayElement = screen.getByLabelText("lightbox overlay");
    expect(overlayElement).toBeInTheDocument();

    fireEvent.click(overlayElement);

    expect(dialogElement).toBeInTheDocument();
  });

  it("image should change when user click next button", async () => {
    const initialIndex = getInitialIndex(0);
    setup({ photos, initialIndex: initialIndex });

    const imageElements = screen.getAllByRole("listitem");
    expect(imageElements[initialIndex]).toBeInTheDocument();
    expect(
      imageElements[initialIndex].classList.contains("selected")
    ).toBeTruthy();
    expect(
      imageElements[initialIndex + 1].classList.contains("selected")
    ).toBeFalsy();

    const nextButton = screen.getByLabelText("next image");

    const { click } = userEvent.setup();
    await click(nextButton);

    expect(
      imageElements[initialIndex].classList.contains("selected")
    ).toBeFalsy();
  });

  it("image should change when user click prev button", async () => {
    const initialIndex = getInitialIndex(photos.length - 1);

    setup({ photos, initialIndex: initialIndex });

    const imageElements = screen.getAllByRole("listitem");
    expect(imageElements[initialIndex]).toBeInTheDocument();
    expect(
      imageElements[initialIndex].classList.contains("selected")
    ).toBeTruthy();
    expect(
      imageElements[initialIndex - 1].classList.contains("selected")
    ).toBeFalsy();

    const prevButton = screen.getByLabelText("previous image");

    const { click } = userEvent.setup();
    await click(prevButton);

    expect(
      imageElements[initialIndex].classList.contains("selected")
    ).toBeFalsy();
  });

  it("initialIndex prop should work", async () => {
    const index = getInitialIndex(1);
    setup({ photos, initialIndex: index });

    const imageElement = screen.getAllByRole("img")[index];
    const initialImage = imageElement.getAttribute("src");

    expect(initialImage).toBe(photos[index].src);
  });

  it("should display valid images when clicking buttons multiple times", async () => {
    setup({ photos, initialIndex: getInitialIndex(0) });
    const imageElements = screen.getAllByRole("img");
    const { click } = userEvent.setup();
    const nextButton = screen.getByLabelText("next image");

    for (const [index] of photos.entries()) {
      const nextIndex = index + 1;
      if (!photos[nextIndex]) return;

      const initialImage = imageElements[index].getAttribute("src");

      await click(nextButton);

      const currentImage = imageElements[nextIndex].getAttribute("src");
      expect(initialImage).not.toBe(currentImage);
      expect(imageElements[index]).not.toBeVisible();
      expect(currentImage).toBe(photos[nextIndex].src);
    }
  });

  it("onClickNext function should be called after click next button", async () => {
    const onClickNext = jest.fn();
    setup({ photos, onClickNext: onClickNext });

    const nextButton = screen.getByLabelText("next image");

    const { click } = userEvent.setup();
    await click(nextButton);

    expect(onClickNext).toHaveBeenCalledTimes(1);
  });

  it("onClickPrev function should be called after click prev button", async () => {
    const onClickPrev = jest.fn();
    setup({
      photos,
      initialIndex: getInitialIndex(1),
      onClickPrev: onClickPrev,
    });

    const prevButton = screen.getByLabelText("previous image");

    const { click } = userEvent.setup();
    await click(prevButton);

    expect(onClickPrev).toHaveBeenCalledTimes(1);
  });

  it("onClickPrev function should not be called after click next button", async () => {
    const onClickNext = jest.fn();
    const onClickPrev = jest.fn();
    setup({ photos, onClickNext: onClickNext, onClickPrev: onClickPrev });

    const nextButton = screen.getByLabelText("next image");

    const { click } = userEvent.setup();
    await click(nextButton);

    expect(onClickPrev).not.toHaveBeenCalled();
  });

  it("onClickNext function should not be called after click prev button", async () => {
    const onClickNext = jest.fn();
    const onClickPrev = jest.fn();
    setup({
      photos,
      initialIndex: getInitialIndex(1),
      onClickNext: onClickNext,
      onClickPrev: onClickPrev,
    });

    const prevButton = screen.getByLabelText("previous image");

    const { click } = userEvent.setup();
    await click(prevButton);

    expect(onClickNext).not.toHaveBeenCalled();
  });
});
