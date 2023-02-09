import React from "react";
import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"h1">;

const Heading = ({ children, className, ...props }: Props) => {
  return (
    <h1
      className={clsx("text-4xl font-light uppercase text-black", className)}
      {...props}
    >
      {children}
    </h1>
  );
};

export default Heading;
