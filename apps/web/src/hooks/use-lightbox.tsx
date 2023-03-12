import dynamic from "next/dynamic";
import type { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";

const LazyLightboxComponent = dynamic(() => import("../components/lightbox"), {
  ssr: false,
});

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

  const Lightbox = useCallback(
    (props: React.ComponentProps<typeof LazyLightboxComponent>) => {
      return (
        <>
          {selectedIndex ? (
            <LazyLightboxComponent
              onClose={handleClose}
              initialIndex={selectedIndex - 1}
              isOpen={true}
              {...props}
            />
          ) : null}
        </>
      );
    },
    [handleClose, selectedIndex]
  );

  return {
    selectedIndex,
    handleClose,
    getLinkProps,
    Lightbox,
  };
};

export default useLightbox;
