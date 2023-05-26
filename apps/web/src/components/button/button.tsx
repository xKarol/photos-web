import clsx from "clsx";
import React from "react";

export type ButtonVariants = "outline" | "3d";

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
        variant === "outline" && "border border-black px-4 py-2 text-sm",
        variant === "3d" &&
          "relative ml-[3px] mt-[-3px] h-[calc(100%-1px)] w-[100px] bg-black px-5 text-white before:absolute before:left-[-4px] before:top-[2px] before:h-full before:w-[4px] before:skew-y-[-45deg] before:border before:border-black after:absolute after:left-[-2px] after:top-[100%] after:h-[4px] after:w-full after:skew-x-[-45deg] after:border after:border-black",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
