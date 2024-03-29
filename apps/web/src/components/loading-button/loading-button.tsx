import clsx from "clsx";
import React, { cloneElement } from "react";

import { Button } from "../button";
import Spinner from "../spinner";

export type LoadingButtonProps = {
  isLoading?: boolean;
  LoadingComponent?: JSX.Element;
  loadingComponentProps?: React.ComponentProps<typeof Spinner>;
} & React.ComponentProps<typeof Button>;

const LoadingButton = ({
  children,
  className,
  LoadingComponent = <Spinner color="black" />,
  isLoading = false,
  loadingComponentProps,
  ...rest
}: LoadingButtonProps) => {
  return (
    <Button
      className={clsx("relative", className)}
      disabled={isLoading}
      aria-busy={isLoading}
      aria-label="Loading button"
      {...rest}
    >
      <span style={{ visibility: isLoading ? "hidden" : "visible" }}>
        {children}
      </span>
      {isLoading
        ? cloneElement(LoadingComponent, {
            ...loadingComponentProps,
            ["aria-live"]: "polite",
            className:
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          })
        : null}
    </Button>
  );
};

export default LoadingButton;
