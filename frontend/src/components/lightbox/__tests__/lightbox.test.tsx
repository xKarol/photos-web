import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Lightbox } from "../index";
import "../../../__mocks__/intersection-observer";
import { useState } from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.HTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

const photos = [
  {
    src: "http://test.com",
    alt: "",
    createdAt: "",
    updatedAt: "",
    height: 200,
    width: 300,
    id: "32435",
    placeholder: "placeholder",
  },
  {
    src: "http://test3.com",
    alt: "",
    createdAt: "",
    updatedAt: "",
    height: 200,
    width: 300,
    id: "32436",
    placeholder: "placeholder",
  },
];

type LightboxProps = React.ComponentProps<typeof Lightbox>;
type Setup = { show?: boolean } & Partial<
  Omit<LightboxProps, "isOpen" | "setIsOpen">
>;

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
  render(<Wrapper />);

  const elements = {
    closeButton: screen.getByLabelText("close"),
    dialogElement: screen.getByRole("dialog"),
    overlayElement: screen.getByLabelText("dialog overlay"),
    nextButton: screen.queryByLabelText("next photo"),
    previousButton: screen.queryByLabelText("previous photo"),
    imageElement: screen.getByRole("img"),
  };

  return { elements };
};

describe("Lightbox", () => {
  it("close button should be visible", () => {
    const { elements } = setup({});
    expect(elements.closeButton).toBeInTheDocument();
  });

  it("dialog should not be visible when property isOpen = false", () => {
    setup({ show: false });
    const dialogElement = screen.queryByRole("dialog");
    expect(dialogElement).not.toBeInTheDocument();
  });

  it("next button should not be visible when current index is last", () => {
    const { elements } = setup({ initialIndex: photos.length - 1 });

    expect(elements.nextButton).not.toBeInTheDocument();
  });

  it("prev button should not be visible when current index is first", () => {
    const { elements } = setup();

    expect(elements.previousButton).not.toBeInTheDocument();
  });

  it("next and prev buttons should not be visible when photos length = 0", () => {
    const { elements } = setup();

    expect(elements.nextButton).not.toBeInTheDocument();
    expect(elements.previousButton).not.toBeInTheDocument();
  });

  it("dialog should close when user click to close button", async () => {
    const { elements } = setup();

    expect(elements.dialogElement).toBeInTheDocument();

    const { click } = userEvent.setup();
    await click(elements.closeButton);

    expect(elements.dialogElement).not.toBeInTheDocument();
  });

  it("dialog should not close when user click to dialog overlay", async () => {
    const { elements } = setup();

    expect(elements.dialogElement).toBeInTheDocument();

    expect(elements.overlayElement).toBeInTheDocument();

    const { click } = userEvent.setup();
    await click(elements.overlayElement);

    expect(elements.dialogElement).toBeInTheDocument();
  });

  it("image should change when user click next button", async () => {
    const { elements } = setup({ photos });

    expect(elements.imageElement).toBeInTheDocument();
    const initialImage = elements.imageElement.getAttribute("src");

    const nextButton = screen.getByLabelText("next photo");

    const { click } = userEvent.setup();
    await click(nextButton);

    expect(initialImage).not.toBe(elements.imageElement.getAttribute("src"));
  });

  it("image should change when user click prev button", async () => {
    const { elements } = setup({ photos, initialIndex: photos.length - 1 });

    expect(elements.imageElement).toBeInTheDocument();

    const initialImage = elements.imageElement.getAttribute("src");

    const prevButton = screen.getByLabelText("previous photo");

    const { click } = userEvent.setup();
    await click(prevButton);

    expect(initialImage).not.toBe(elements.imageElement.getAttribute("src"));
  });

  it("initialIndex prop should work", async () => {
    const initialIndex = (index: number) => {
      if (!photos[index]) throw new Error("Invalid photo index");
      return index;
    };
    const index = initialIndex(1);
    const { elements } = setup({ photos, initialIndex: index });

    const initialImage = elements.imageElement.getAttribute("src");

    expect(initialImage).toBe(photos[index].src);
  });

  it("should display valid images when clicking buttons multiple times", async () => {
    const initialIndex = 0;
    const { elements } = setup({ photos, initialIndex });

    const { click } = userEvent.setup();
    const nextButton = screen.getByLabelText("next photo");

    const compareImage = async (nextIndex: number) => {
      const initialImage = elements.imageElement.getAttribute("src");

      await click(nextButton);

      const currentImage = elements.imageElement.getAttribute("src");
      expect(initialImage).not.toBe(currentImage);
      expect(currentImage).toBe(photos[nextIndex].src);
    };

    for (const [index] of photos.entries()) {
      const nextIndex = index + 1;
      if (!photos[nextIndex]) break;
      await compareImage(nextIndex);
    }
  });
});
