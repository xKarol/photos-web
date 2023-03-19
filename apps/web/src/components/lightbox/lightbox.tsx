import React, { useRef } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { VscClose } from "react-icons/vsc";
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";
import type { Image as ImageType } from "types";
import clsx from "clsx";
import { Carousel } from "react-responsive-carousel";
import { NextSeo } from "next-seo";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useScreen from "../../hooks/use-screen";

type Props = {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  initialIndex?: number;
  photos: ImageType[];
  onClickNext?: (currentIndex: number, lastIndex: number) => void;
  onClickPrev?: (currentIndex: number, lastIndex: number) => void;
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
  const isMobile = useScreen("sm", true);

  const handleClose = () => {
    onClose?.();
    setIsOpen?.(false);
  };

  const handleChange = (index: number) => {
    const lastIndex = photos.length - 1;
    if (index > active.current) onClickNext?.(index, lastIndex);
    else onClickPrev?.(index, lastIndex);

    active.current = index;
  };

  return (
    <>
      <NextSeo themeColor="#000" />
      <Dialog
        as="div"
        className={clsx("relative z-50", className)}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClose={() => {}}
        open={isOpen}
      >
        <Dialog.Overlay
          className="fixed inset-0 bg-black"
          aria-label="lightbox overlay"
        />

        <button
          className="fixed top-5 right-5 z-[60] cursor-pointer text-3xl text-white"
          onClick={handleClose}
          aria-label="close the lightbox"
        >
          <VscClose />
        </button>
        <Carousel
          showArrows
          showIndicators={false}
          showThumbs={false}
          swipeable={isMobile}
          useKeyboardArrows
          showStatus={false}
          animationHandler={isMobile ? "slide" : "fade"}
          className="fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2"
          selectedItem={initialIndex}
          onChange={handleChange}
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                aria-label="next image"
                className="absolute inset-y-0 right-0 z-[2] hidden w-1/2 items-center justify-end p-5 text-3xl text-white sm:flex"
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
                aria-label="previous image"
                className="absolute inset-y-0 left-0 z-[2] hidden w-1/2 items-center justify-start p-5 text-3xl text-white sm:flex"
              >
                <TfiAngleLeft />
              </button>
            )
          }
        >
          {photos.map(({ height, width, src, alt, id, placeholder }) => (
            <div key={id}>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{
                  width: "auto",
                  height: "auto",
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
                placeholder="blur"
                blurDataURL={placeholder}
              />
            </div>
          ))}
        </Carousel>
      </Dialog>
    </>
  );
};

export default Lightbox;
