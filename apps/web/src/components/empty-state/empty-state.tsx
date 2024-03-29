import Lottie from "lottie-react";
import React from "react";

import emptyStateAnimation from "../../../public/assets/animations/empty-state.json";
import Heading from "../heading";
import LoadingButton from "../loading-button";

type Props = {
  text?: string;
  showButton?: boolean;
  isLoading?: boolean;
  handleRefresh?: () => void;
};

const EmptyState = ({
  text = "No data found",
  showButton = false,
  isLoading = false,
  handleRefresh,
}: Props) => {
  return (
    <div
      className="mx-auto flex flex-col items-center justify-center"
      role="region"
      aria-label="No data available"
    >
      <Lottie
        className="mx-auto h-40 w-[150px] max-w-[400px]"
        animationData={emptyStateAnimation}
        loop={true}
        aria-label="Animation of empty state"
      />
      <Heading className="!text-xl capitalize">{text}</Heading>
      {showButton ? (
        <LoadingButton
          variant="outline"
          className="mt-3"
          isLoading={isLoading}
          onClick={handleRefresh}
        >
          Refresh
        </LoadingButton>
      ) : null}
    </div>
  );
};

export default EmptyState;
