import clsx from "clsx";
import React, { forwardRef, useId } from "react";
import Alert from "../alert";

export type InputFieldProps = {
  label?: string;
  error?: string;
  type?: "text" | "password" | "email";
  textarea?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, error, type = "text", className, textarea, required, ...rest },
    ref
  ) => {
    const id = useId();
    const inputClass = "border border-zinc-300 p-2";
    return (
      <div className={clsx("relative flex w-full flex-col", className)}>
        <label className="mb-1 text-xs" htmlFor={id}>
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
        {textarea ? (
          <textarea
            id={id}
            aria-describedby={id}
            aria-invalid={error ? "true" : "false"}
            className={clsx("min-h-[50px]", inputClass)}
            {...rest}
            // @ts-expect-error
            ref={ref}
          />
        ) : (
          <input
            type={type}
            className={inputClass}
            {...rest}
            ref={ref}
            id={id}
            aria-describedby={id}
            aria-invalid={error ? "true" : "false"}
          />
        )}
        {error ? (
          <Alert
            variant="error"
            className="absolute left-0 top-[calc(100%_+_2px)] max-w-full truncate text-xs"
            title={error}
          >
            {error}
          </Alert>
        ) : null}
      </div>
    );
  }
);
InputField.displayName = "InputField";

export default InputField;
