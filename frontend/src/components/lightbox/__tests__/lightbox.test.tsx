import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Lightbox } from "../index";

const setIsOpen = jest.fn();

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

describe("Lightbox", () => {
  it("close button should be visible", () => {
    render(<Lightbox isOpen={true} setIsOpen={setIsOpen} photos={photos} />);
    const closeButton = screen.getByLabelText("close button");
    expect(closeButton).toBeInTheDocument();
  });

  it("dialog should not be visible when property isOpen = false", () => {
    render(<Lightbox isOpen={false} setIsOpen={setIsOpen} photos={photos} />);
    const dialogElement = screen.queryByRole("dialog");
    expect(dialogElement).not.toBeInTheDocument();
  });

  it("next button should not be visible when current index is last", () => {
    render(
      <Lightbox
        isOpen={true}
        setIsOpen={setIsOpen}
        photos={photos}
        initialIndex={photos.length - 1}
      />
    );
    const nextButton = screen.queryByLabelText("next photo");
    expect(nextButton).not.toBeInTheDocument();
  });

  it("prev button should not be visible when current index is first", () => {
    render(<Lightbox isOpen={true} setIsOpen={setIsOpen} photos={photos} />);
    const prevButton = screen.queryByLabelText("previous photo");
    expect(prevButton).not.toBeInTheDocument();
  });

  it("next and prev buttons should not be visible when photos length = 0", () => {
    render(<Lightbox isOpen={true} setIsOpen={setIsOpen} photos={[]} />);
    const nextButton = screen.queryByLabelText("next photo");
    expect(nextButton).not.toBeInTheDocument();

    const prevButton = screen.queryByLabelText("previous photo");
    expect(prevButton).not.toBeInTheDocument();
  });

  it("dialog should close when user click to close button", async () => {
    render(<Lightbox isOpen={true} setIsOpen={setIsOpen} photos={[]}/>);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();

    const { click } = userEvent.setup();
    const closeButton = screen.getByLabelText("close button");
    await click(closeButton);

    expect(dialogElement).not.toBeInTheDocument();
  });

  it("dialog should not close when user click to dialog overlay", async () => {
    render(<Lightbox isOpen={true} setIsOpen={setIsOpen} photos={[]}/>);
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
