import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { usePhotos } from "./use-photos";

export const usePhotosRef = () => {
  const { fetchNextPage, ...response } = usePhotos();
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "-500px 0px 0px 0px",
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  return { ref, fetchNextPage, ...response };
};
