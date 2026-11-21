import Image from "next/image";

const images = [
  {
    src: "/images/gallery-5.webp",
    alt: "Left Image",
  },
  {
    src: "/images/gallery-7.webp",
    alt: "Middle Image",
  },
  {
    src: "/images/gallery-8.webp",
    alt: "Right Image",
  },
];

export const Gallery = () => {
  return (
    <div className="mx-auto mb-10 grid w-5/6 max-w-6xl grid-cols-3 gap-3 md:mb-20 md:w-full md:gap-8 md:px-12">
      {images.map((photo) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={352}
          height={470}
          className="h-auto w-full object-cover"
        />
      ))}
    </div>
  );
};
