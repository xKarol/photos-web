import React from "react";
import Lottie from "lottie-react";
import emptyStateAnimation from "../../../../public/assets/animations/empty-state.json";
import Heading from "../../../components/heading";
import LoadingButton from "../../../components/loading-button";

type Props = {
  showButton?: boolean;
  isLoading?: boolean;
  handleRefresh?: () => void;
};

const EmptyState = ({
  showButton = false,
  isLoading = false,
  handleRefresh,
}: Props) => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <Lottie
        className="mx-auto w-[150px] max-w-[300px] "
        animationData={emptyStateAnimation}
        loop={true}
      />
      <Heading className="text-xl capitalize">No images found</Heading>
      {showButton ? (
        <LoadingButton
          className="btn mt-3"
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
