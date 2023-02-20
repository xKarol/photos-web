import React from "react";
import HamburgerComponent from "hamburger-react";
import type { CommonBurgerProps } from "hamburger-react";

const Hamburger = ({ ...props }: CommonBurgerProps) => {
  return (
    <div className="z-20">
      <HamburgerComponent
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
