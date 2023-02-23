import clsx from "clsx";
import React from "react";

export type LayoutProps<C extends React.ElementType> = {
  as?: C;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>;

const Layout = <C extends React.ElementType = "div">({
  as,
  children,
  className,
  ...props
}: LayoutProps<C>) => {
  const Component = as || "div";
  return (
    <Component className={clsx("container mx-auto", className)} {...props}>
      {children}
    </Component>
  );
};

export default Layout;
