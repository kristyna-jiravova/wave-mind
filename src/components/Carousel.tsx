import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import products from "@/data/products.json";
import { Button } from "./Button";

export const Carousel = () => {
  return (
    <div className="relative mx-auto mt-10 mb-10 max-w-6xl md:mt-20 md:mb-20">
      <div className="absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 md:block">
        <Button variant="circle" type="button" aria-label="Previous product">
          <ChevronLeft />
        </Button>
      </div>
      <div className="px-8">
        <div className="flex snap-x snap-mandatory overflow-x-auto">
          {products.map((product) => (
            <div key={product.slug} className="w-1/2 shrink-0 snap-start px-2 md:px-4 lg:w-1/3">
              <Link href={`/shop/${product.slug}`} className="block">
                <ViewTransition name={product.slug}>
                  <Image
                    src={`/images/${product.image}`}
                    alt={product.name}
                    width={352}
                    height={470}
                    className="aspect-3/4 w-full object-cover"
                  />
                </ViewTransition>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 md:block">
        <Button variant="circle" type="button" aria-label="Next product">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
