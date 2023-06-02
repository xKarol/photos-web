import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { usePhotos } from "./use-photos";

export const usePhotosRef = () => {
  const { fetchNextPage, ...response } = usePhotos();
  const { ref, inView } = useInView({
    rootMargin: "0px 0px 2000px 0px",
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  return { ref, fetchNextPage, ...response };
};
