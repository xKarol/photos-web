import clsx from "clsx";
import React from "react";

type Props = Omit<React.ComponentPropsWithoutRef<"button">, "children">;

const Hamburger = ({ className, ...props }: Props) => {
  return (
    <button
      className={clsx("flex w-[30px] flex-col space-y-1", className)}
      aria-label="Open the navbar"
      {...props}
    >
      <span className="h-[2px] w-full bg-black" />
      <span className="h-[2px] w-full bg-black" />
      <span className="h-[2px] w-full bg-black" />
    </button>
  );
};

export default Hamburger;
