import clsx from "clsx";
import React from "react";
import { BeatLoader } from "react-spinners";

type Props = React.ComponentProps<typeof BeatLoader>;

const Spinner = ({ className, ...rest }: Props) => {
  return (
    <BeatLoader
      color="white"
      cssOverride={{ display: "flex" }}
      className={clsx("m-auto max-w-max", className)}
      size={10}
      role="alert"
      aria-busy="true"
      {...rest}
    />
  );
};

export default Spinner;
