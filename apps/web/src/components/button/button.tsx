import clsx from "clsx";
import React from "react";

export type ButtonVariants = "fill" | "outline";

export type Props = {
  variant?: ButtonVariants;
} & React.ComponentPropsWithoutRef<"button">;

const Button = ({
  variant = "outline",
  className,
  children,
  ...rest
}: Props) => {
  return (
    <button
      className={clsx(
        variant === "fill" && "bg-black px-4 py-2 text-white",
        variant === "outline" && "border border-black px-4 py-2 text-sm",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
