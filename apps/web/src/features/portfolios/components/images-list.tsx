import Link from "next/link";
import Image from "next/image";
import React from "react";
import usePortfolio from "../hooks/use-portfolio";
import usePortfolioPage from "../hooks/use-portfolio-page";
import useLightbox from "../../../hooks/use-lightbox";

const ImagesList = () => {
  const { slug } = usePortfolioPage();
  const { data } = usePortfolio(slug);
  const { getLinkProps } = useLightbox();

  return (
    <section className="flex flex-col gap-10">
      {data.images.map(
        ({ id, src, alt, height, width, placeholder }, index) => (
          <Link key={id} {...getLinkProps(index)}>
            <Image
              src={src}
              alt={alt}
              height={height}
              width={width}
              style={{
                width: "100%",
                maxHeight: "1200px",
                objectFit: "cover",
              }}
              placeholder="blur"
              blurDataURL={placeholder}
            />
          </Link>
        )
      )}
    </section>
  );
};

export default ImagesList;
