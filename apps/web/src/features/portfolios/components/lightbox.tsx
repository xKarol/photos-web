import { useRouter } from "next/router";
import React from "react";
import { Lightbox as LightboxComponent } from "../../../components/lightbox";
import usePortfolio from "../hooks/use-portfolio";

const Lightbox = () => {
  const router = useRouter();
  const slug = router.query.portfolioSlug as string;
  const { data } = usePortfolio(slug);
  const selectedIndex = Number(router.query?.selected);

  if (selectedIndex)
    return (
      <LightboxComponent
        initialIndex={selectedIndex - 1}
        photos={data.images}
        onClose={() =>
          router.push(
            {
              query: { portfolioSlug: router.query.portfolioSlug },
            },
            undefined,
            { shallow: true }
          )
        }
      />
    );
};

export default Lightbox;
