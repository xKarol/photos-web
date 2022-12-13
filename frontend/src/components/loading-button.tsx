import React from "react";
import Spinner from "./spinner";

type Props = {
  isLoading?: boolean;
  LoadingComponent?: JSX.Element;
} & Required<React.PropsWithChildren>;
// TODO change children type to only one component (no numbers, strings, etc.)
const LoadingButton = ({
  children,
  LoadingComponent,
  isLoading = false,
}: Props) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, children.props, [
      isLoading ? LoadingComponent || <Spinner /> : children.props.children,
    ]);
  }
  return <>{children}</>;
};

export default LoadingButton;
