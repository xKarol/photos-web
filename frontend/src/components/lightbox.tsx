import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { VscClose } from "react-icons/vsc";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { PhotoType } from "../@types/photos";
import Photo from "./photos-grid/photo";

type Props = {
  isOpen: boolean;
  initialIndex?: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  photos: PhotoType[];
  onClickNext?: (currentIndex: number) => void;
  onClickPrev?: (currentIndex: number) => void;
};

const Lightbox = ({
  isOpen,
  setIsOpen,
  photos,
  initialIndex = 0,
  onClickNext,
  onClickPrev,
}: Props) => {
  const [active, setActive] = useState(initialIndex || 0);
  const closeModal = () => setIsOpen(false);
  const { height, width, placeholder, alt, src } = photos[active] || {};

  const changePhoto = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActive((state) => (state >= photos.length - 1 ? 0 : state + 1));
      onClickNext?.(active + 1);
      return;
    }
    setActive((state) => (state <= 0 ? photos.length - 1 : state - 1));
    onClickPrev?.(active + 1);
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
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <VscClose
          className="fixed top-5 right-5 text-white cursor-pointer z-10 text-3xl"
          onClick={closeModal}
        />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="fixed left-0 h-full w-[50vw] text-3xl text-white z-10">
            <HiChevronLeft
              className="fixed left-5 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => changePhoto("prev")}
            />
          </div>
          <div className="fixed right-0 h-full w-[50vw] text-3xl text-white z-10">
            <HiChevronRight
              className="fixed right-5 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => changePhoto("next")}
            />
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
                <Photo
                  src={src}
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
          <div className="fixed bottom-5 left-5 text-xs px-3 py-1 rounded-md bg-opacity-25 text-white bg-black z-10 pointer-events-none">
            {active + 1} / {photos.length}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Lightbox;
