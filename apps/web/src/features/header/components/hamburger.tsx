import clsx from "clsx";
import HamburgerComponent from "hamburger-react";
import type { CommonBurgerProps } from "hamburger-react";
import React from "react";

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
