import clsx from "clsx";
import React, { forwardRef } from "react";

type Props = {
  label?: string;
  type?: "text" | "password" | "email";
  textarea?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

const InputField = forwardRef<HTMLInputElement, Props>(
  ({ label, type = "text", className, textarea, required, ...rest }, ref) => {
    const inputClass = "border border-zinc-300 h-10";
    return (
      <div className={clsx("flex flex-col w-full", className)}>
        <label className="text-xs mb-1">
          {label} {required ? "*" : null}
        </label>
        {textarea ? (
          <textarea
            className={clsx("min-h-[50px]", inputClass)}
            {...rest}
            // @ts-ignore
            ref={ref}
          />
        ) : (
          <input type={type} className={inputClass} {...rest} ref={ref} />
        )}
      </div>
    );
  }
);

export default InputField;
