import clsx from "clsx";
import React from "react";

type Props = {
  label?: string;
  type?: "text" | "password" | "email";
  textarea?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

const InputField = ({
  label,
  type = "text",
  className,
  textarea,
  ...rest
}: Props) => {
  const inputClass = "border border-zinc-300 h-10";
  return (
    <div className={clsx("flex flex-col w-full", className)}>
      <label className="text-xs mb-1">{label}</label>
      {textarea ? (
        <textarea className={clsx("min-h-[50px]", inputClass)} />
      ) : (
        <input type={type} className={inputClass} {...rest} />
      )}
    </div>
  );
};

export default InputField;
