import clsx from "clsx";
import React from "react";

type Props = {
  variant?: "info" | "error";
} & React.ComponentPropsWithoutRef<"span">;

const Alert = ({ children, variant = "info", className, ...rest }: Props) => {
  return (
    <span
      role="alert"
      className={clsx(
        "text-sm",
        variant === "error" && "text-red-400",
        variant === "info" && "text-font",
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Alert;
