import React from "react";
import HamburgerComponent from "hamburger-react";
import type { CommonBurgerProps } from "hamburger-react";
import clsx from "clsx";

const Hamburger = ({
  className,
  ...props
}: CommonBurgerProps & { className: string }) => {
  return (
    <div className={clsx("z-20", className)} data-testid="hamburger-button">
      <HamburgerComponent
        label="hamburger menu button"
        size={25}
        rounded={true}
        distance="sm"
        direction="right"
        {...props}
      />
    </div>
  );
};

export default Hamburger;
