import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Lightbox } from "../index";
import "../../../__mocks__/intersection-observer";
import { useState } from "react";

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
    src: "http://test.com",
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

  return render(<Wrapper />);
};

describe("Lightbox", () => {
  it("close button should be visible", () => {
    setup();
    const closeButton = screen.getByLabelText("close");
    expect(closeButton).toBeInTheDocument();
  });

  it("dialog should not be visible when property isOpen = false", () => {
    setup({ show: false });
    const dialogElement = screen.queryByRole("dialog");
    expect(dialogElement).not.toBeInTheDocument();
  });

  it("next button should not be visible when current index is last", () => {
    setup({ initialIndex: photos.length - 1 });

    const nextButton = screen.queryByLabelText("next photo");
    expect(nextButton).not.toBeInTheDocument();
  });

  it("prev button should not be visible when current index is first", () => {
    setup();

    const prevButton = screen.queryByLabelText("previous photo");
    expect(prevButton).not.toBeInTheDocument();
  });

  it("next and prev buttons should not be visible when photos length = 0", () => {
    setup();

    const nextButton = screen.queryByLabelText("next photo");
    expect(nextButton).not.toBeInTheDocument();

    const prevButton = screen.queryByLabelText("previous photo");
    expect(prevButton).not.toBeInTheDocument();
  });

  it("dialog should close when user click to close button", async () => {
    setup();

    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();

    const { click } = userEvent.setup();
    const closeButton = screen.getByLabelText("close");
    await click(closeButton);

    expect(dialogElement).not.toBeInTheDocument();
  });

  it("dialog should not close when user click to dialog overlay", async () => {
    setup();

    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();

    const overlayElement = screen.getByLabelText("dialog overlay");
    expect(overlayElement).toBeInTheDocument();

    const { click } = userEvent.setup();
    await click(overlayElement);

    expect(dialogElement).toBeInTheDocument();
  });

  // 7. image should change when user click next button
  // 8. image should change when user click prev button
  // 9. initialIndex prop should work
});
