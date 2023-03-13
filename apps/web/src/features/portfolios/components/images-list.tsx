import Link from "next/link";
import React from "react";
import usePortfolio from "../hooks/use-portfolio";
import usePortfolioPage from "../hooks/use-portfolio-page";
import useLightbox from "../../../hooks/use-lightbox";
import { Photo } from "../../../components/photo";

const ImagesList = () => {
  const { slug } = usePortfolioPage();
  const { data } = usePortfolio(slug);
  const { getLinkProps } = useLightbox();

  return (
    <section className="flex flex-col gap-10">
      {data.images.map(({ id, alt, height, width, placeholder }, index) => (
        <Link key={id} {...getLinkProps(index)}>
          <Photo
            id={id}
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
      ))}
    </section>
  );
};

export default ImagesList;
