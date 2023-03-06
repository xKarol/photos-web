import type { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

const useLightbox = () => {
  const router = useRouter();
  const selectedIndex = Number(router.query?.selected);

  const handleClose = useCallback(() => {
    const queries = router.query;
    delete queries.selected;
    return router.push(
      {
        query: {
          ...queries,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  }, [router]);

  const getLinkProps = useCallback(
    (index: number): LinkProps => {
      return {
        href: {
          query: {
            ...router.query,
            selected: index + 1,
          },
        },
        shallow: true,
      };
    },
    [router.query]
  );

  return { selectedIndex, handleClose, getLinkProps };
};

export default useLightbox;
