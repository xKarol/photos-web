import Link from "next/link";
import React from "react";
import Photo from "./photo";

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80",
    alt: "desert",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1596625820723-f0f481ff80be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    alt: "desert",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1568801556940-e5b3a55fa6ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
    alt: "desert",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1448831338187-78296e6fdc4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
    alt: "desert",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1515581247767-d78687bf2254?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
    alt: "desert",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1547234935-80c7145ec969?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80",
    alt: "desert",
  },
];

const Photos = () => {
  const half = images.length / 2;
  return (
    <section className="container mx-auto">
      <div className="flex space-x-10">
        <div className="w-full flex flex-col space-y-10">
          {images.slice(0, half).map(({ id, src, alt }) => (
            <Link href={`/photo/${id}`}>
              <Photo
                key={id}
                className="relative"
                src={src}
                alt={alt}
                width={400}
                height={300}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Link>
          ))}
        </div>
        <div className="w-full flex flex-col space-y-10">
          {images.slice(half, images.length).map(({ id, src, alt }) => (
            <Link href={`/photo/${id}`}>
              <Photo
                key={id}
                className="relative"
                src={src}
                alt={alt}
                width={700}
                height={475}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Photos;
