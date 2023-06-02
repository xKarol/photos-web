import clsx from "clsx";
import React from "react";

type AllowedElements = keyof Pick<
  HTMLElementTagNameMap,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

export type HeadingProps<C extends AllowedElements> = {
  as?: C;
} & React.ComponentPropsWithoutRef<C>;

const Heading = <C extends AllowedElements = "h1">({
  as,
  children,
  className,
  ...props
}: HeadingProps<C>) => {
  const Component = as || "h1";
  return (
    <Component
      className={clsx("text-4xl font-light uppercase text-black", className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Heading;
