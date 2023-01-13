import clsx from "clsx";
import React, { cloneElement } from "react";
import Spinner from "./spinner";

type Props = {
  isLoading?: boolean;
  LoadingComponent?: JSX.Element;
} & React.ComponentPropsWithoutRef<"button">;

const LoadingButton = ({
  children,
  className,
  LoadingComponent = <Spinner />,
  isLoading = false,
  ...rest
}: Props) => {
  return (
    <button className={clsx("relative", className)} {...rest}>
      <span style={{ visibility: isLoading ? "hidden" : "visible" }}>
        {children}
      </span>
      {isLoading
        ? cloneElement(LoadingComponent, {
            className:
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          })
        : null}
    </button>
  );
};

export default LoadingButton;
