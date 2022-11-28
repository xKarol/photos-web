import clsx from "clsx";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"button">;

const Submit = ({ className, children, ...rest }: Props) => {
  return (
    <button
      type="submit"
      className={clsx(
        "relative px-5 w-[100px] bg-black text-white h-[calc(100%-1px)] mt-[-3px] ml-[3px] before:absolute before:left-[-4px] before:top-[2px] before:h-full before:w-[4px] before:border before:border-black before:skew-y-[-45deg] after:absolute after:left-[-2px] after:top-[100%] after:h-[4px] after:w-full after:border after:border-black after:skew-x-[-45deg]",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Submit;