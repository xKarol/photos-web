import React, { useRef } from "react";
import { Dialog } from "@headlessui/react";
import { VscClose } from "react-icons/vsc";
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";
import type { Image } from "types";
import clsx from "clsx";
import { Carousel } from "react-responsive-carousel";
import Photo from "../../features/photos/components/photo"; //TODO export this component to /components dir
import { getImageUrl } from "../../utils/misc";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type Props = {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  initialIndex?: number;
  photos: Image[];
  onClickNext?: (currentIndex: number) => void;
  onClickPrev?: (currentIndex: number) => void;
  onClose?: () => void;
  overlayOpacity?: number;
} & React.ComponentPropsWithoutRef<"div">;

const Lightbox = ({
  isOpen = true,
  setIsOpen,
  photos,
  initialIndex = 0,
  onClose,
  onClickNext,
  onClickPrev,
  className,
}: Props) => {
  const active = useRef<number>(initialIndex);

  const handleClose = () => {
    onClose?.();
    setIsOpen?.(false);
  };

  const handleChange = (index: number) => {
    if (index > active.current) onClickNext?.(index);
    else onClickPrev?.(index);

    active.current = index;
  };

  return (
    <Dialog
      as="div"
      className={clsx("relative z-50", className)}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClose={() => {}}
      open={isOpen}
    >
      <Dialog.Overlay
        className="fixed inset-0 bg-black"
        aria-label="dialog overlay"
      />

      <button
        className="fixed top-5 right-5 z-[60] cursor-pointer text-3xl text-white"
        onClick={handleClose}
        aria-label="close"
      >
        <VscClose />
      </button>
      <Carousel
        showArrows
        showIndicators={false}
        showThumbs={false}
        swipeable={false}
        showStatus={false}
        animationHandler="fade"
        className="relative z-50"
        selectedItem={initialIndex}
        onChange={handleChange}
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              aria-label="next photo"
              className="absolute inset-y-0 right-0 z-[2] flex w-1/2 items-center justify-end p-5 text-3xl text-white"
            >
              <TfiAngleRight />
            </button>
          )
        }
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              aria-label="previous photo"
              className="absolute inset-y-0 left-0 z-[2] flex w-1/2 items-center justify-start p-5 text-3xl text-white"
            >
              <TfiAngleLeft />
            </button>
          )
        }
      >
        {photos.map(({ height, width, placeholder, alt, id }) => (
          <div key={id} className="flex h-screen items-center justify-center">
            <Photo
              src={getImageUrl(id)}
              alt={alt}
              width={width}
              height={height}
              blurDataURL={placeholder}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </Carousel>
    </Dialog>
  );
};

export default Lightbox;
