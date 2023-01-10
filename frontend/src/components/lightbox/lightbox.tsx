import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { VscClose } from "react-icons/vsc";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { PhotoType } from "../../@types/photos";
import Photo from "../photos-grid/photo";
import { getImageUrl } from "../../utils/misc";

type Props = {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  initialIndex?: number;
  photos: PhotoType[];
  onClickNext?: (currentIndex: number) => void;
  onClickPrev?: (currentIndex: number) => void;
  onClose?: () => void;
};

const Lightbox = ({
  isOpen = true,
  setIsOpen,
  photos,
  initialIndex = 0,
  onClose,
  onClickNext,
  onClickPrev,
}: Props) => {
  const [active, setActive] = useState(initialIndex || 0);

  const { height, width, placeholder, alt, id } = photos[active] || {};
  const isEmpty = photos.length === 0;
  const isFirst = isEmpty || active === 0;
  const isLast = isEmpty || active === photos.length - 1;

  const changePhoto = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActive((state) => (state >= photos.length - 1 ? 0 : state + 1));
      onClickNext?.(active + 1);
      return;
    }
    setActive((state) => (state <= 0 ? photos.length - 1 : state - 1));
    onClickPrev?.(active + 1);
  };

  const handleClose = () => {
    setIsOpen?.(false);
    onClose?.();
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay
            className="fixed inset-0 bg-black bg-opacity-75"
            aria-label="dialog overlay"
          />
        </Transition.Child>

        <button
          className="fixed top-5 right-5 text-white cursor-pointer z-10 text-3xl"
          onClick={handleClose}
          aria-label="close"
        >
          <VscClose />
        </button>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="fixed left-0 h-full w-[50vw] text-3xl text-white z-10">
            {!isFirst && (
              <button
                className="fixed left-5 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => changePhoto("prev")}
                aria-label="previous photo"
              >
                <HiChevronLeft />
              </button>
            )}
          </div>
          <div className="fixed right-0 h-full w-[50vw] text-3xl text-white z-10">
            {!isLast && (
              <button
                className="fixed right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => changePhoto("next")}
                aria-label="next photo"
              >
                <HiChevronRight />
              </button>
            )}
          </div>
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden transition-all">
                {!isEmpty && (
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
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Lightbox;
