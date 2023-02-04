import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { VscClose } from "react-icons/vsc";
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";
import type { Image } from "types";
import Photo from "../../features/photos/components/photo"; //TODO export this component to /components dir
import { getImageUrl } from "../../utils/misc";
import clsx from "clsx";
import { Carousel } from "react-responsive-carousel";
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
  // eslint-disable-next-line unicorn/consistent-function-scoping, @typescript-eslint/no-empty-function
  const handleClose = () => {};

  return (
    <>
      <style jsx>
        {`
          .carousel .slider {
            z-index: 1;
          }
        `}
      </style>
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
          className="fixed top-5 right-5 text-white cursor-pointer z-10 text-3xl"
          onClick={handleClose}
          aria-label="close"
        >
          <VscClose />
        </button>
        <Carousel
          showArrows
          showIndicators={false}
          animationHandler="fade"
          className="z-50"
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="z-[2] p-5 text-white absolute right-0 top-0 bottom-0 w-1/2 text-3xl flex justify-end items-center"
              >
                <TfiAngleRight />
              </button>
            )
          }
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="z-[2] p-5 text-white absolute left-0 top-0 bottom-0 w-1/2 text-3xl flex items-center justify-start"
              >
                <TfiAngleLeft />
              </button>
            )
          }
        >
          {photos.map(({ height, width, placeholder, alt, id }) => (
            <Photo
              key={id}
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
          ))}
        </Carousel>
      </Dialog>
    </>
  );

  // return (
  //   <Dialog
  //     as="div"
  //     className={clsx("relative z-50", className)}
  //     // eslint-disable-next-line @typescript-eslint/no-empty-function
  //     onClose={() => {}}
  //     open={isOpen}
  //   >
  //     <Dialog.Overlay
  //       className="fixed inset-0 bg-black"
  //       aria-label="dialog overlay"
  //     />

  //     <button
  //       className="fixed top-5 right-5 text-white cursor-pointer z-10 text-3xl"
  //       onClick={handleClose}
  //       aria-label="close"
  //     >
  //       <VscClose />
  //     </button>

  //     <div className="fixed inset-0 overflow-y-auto">
  //       <div className="fixed left-0 h-full w-[50vw] text-3xl text-white z-10">
  //         {!isFirst && (
  //           <button
  //             className="fixed left-5 top-1/2 -translate-y-1/2 cursor-pointer"
  //             onClick={() => changePhoto("prev")}
  //             aria-label="previous photo"
  //           >
  //             <HiChevronLeft />
  //           </button>
  //         )}
  //       </div>
  //       <div className="fixed right-0 h-full w-[50vw] text-3xl text-white z-10">
  //         {!isLast && (
  //           <button
  //             className="fixed right-5 top-1/2 -translate-y-1/2 cursor-pointer"
  //             onClick={() => changePhoto("next")}
  //             aria-label="next photo"
  //           >
  //             <HiChevronRight />
  //           </button>
  //         )}
  //       </div>
  //       <div className="flex min-h-full items-center justify-center p-4 text-center">
  //         <Dialog.Panel className="w-full max-w-md transform overflow-hidden transition-all">
  //           {!isEmpty && (
  //             <Photo
  //               src={getImageUrl(id)}
  //               alt={alt}
  //               width={width}
  //               height={height}
  //               blurDataURL={placeholder}
  //               style={{
  //                 width: "100%",
  //                 height: "auto",
  //                 maxHeight: "80vh",
  //                 objectFit: "contain",
  //               }}
  //             />
  //           )}
  //         </Dialog.Panel>
  //       </div>
  //     </div>
  //   </Dialog>
  // );
};

export default Lightbox;
