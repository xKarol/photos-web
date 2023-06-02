import clsx from "clsx";
import React, { forwardRef, useId } from "react";

import Alert from "../alert";

export type InputFieldProps = {
  label?: string;
  error?: string;
  type?: "text" | "password" | "email";
  textarea?: boolean;
} & React.ComponentPropsWithRef<"input">;

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, error, type = "text", className, textarea, required, ...rest },
    ref
  ) => {
    const id = useId();
    const TextBoxElement = textarea ? "textarea" : "input";
    return (
      <div className={clsx("relative flex w-full flex-col", className)}>
        <label className="mb-1 text-xs" htmlFor={id}>
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>
        <TextBoxElement
          id={id}
          aria-describedby={id}
          aria-invalid={error ? "true" : "false"}
          className={clsx(
            "border border-gray-300 p-2",
            textarea && "min-h-[50px]"
          )}
          {...rest}
          {...(!textarea && { type })}
          // @ts-expect-error
          ref={ref}
        />
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
