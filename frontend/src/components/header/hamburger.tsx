import clsx from "clsx";
import React from "react";

type Props = Omit<React.ComponentPropsWithoutRef<"button">, "children">;

const Hamburger = ({ className, ...props }: Props) => {
  return (
    <button
      className={clsx("flex flex-col space-y-1 w-[30px]", className)}
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
