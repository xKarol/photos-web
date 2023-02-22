import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Photo from "../../../features/photos/components/photo";
import { getImageUrl } from "../../../utils/misc";
import { getImagePlaceholder } from "../../../utils/placeholder";
import usePortfolio from "../hooks/use-portfolio";

const ImagesList = () => {
  const router = useRouter();
  const slug = router.query.portfolioSlug as string;
  const { data } = usePortfolio(slug);
  const { images = [] } = data || {};

  return (
    <section className="flex flex-col gap-10">
      {images.map(({ id, alt, height, width }, index) => (
        <Link
          key={id}
          href={{
            query: { ...router.query, selected: index + 1 },
          }}
          shallow
        >
          <Photo
            alt={alt}
            src={getImageUrl(id)}
            height={height}
            width={width}
            blurDataURL={getImagePlaceholder(id)}
            style={{
              width: "100%",
              maxHeight: "1200px",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </Link>
      ))}
    </section>
  );
};

export default ImagesList;
