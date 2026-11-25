import { ViewTransition } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import products from "../../../data/products.json";
import { Button } from "@/components/Button";
import en from "../../../../i18n/local/en.json";

type ProductDetailsProps = {
  params: Promise<{ slug: string }>;
};

const ProductDetails = async ({ params }: ProductDetailsProps) => {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-[75vh] max-w-7xl px-6 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex items-start gap-4">
          <div className="flex w-16 shrink-0 flex-col gap-3 md:w-20">
            <div className="aspect-3/4 w-full rounded-md border border-gray-200 bg-gray-100" />
            <div className="aspect-3/4 w-full rounded-md border border-gray-200 bg-gray-100" />
            <div className="aspect-3/4 w-full rounded-md border border-gray-200 bg-gray-100" />
          </div>

          <div className="min-w-0 flex-1">
            <ViewTransition name={slug}>
              <Image src={`/images/${product.image}`} alt={product.name} width={352} height={470} />
            </ViewTransition>
          </div>
        </div>

        <div className="text-navy">
          <h1 className="mb-2 text-3xl font-light tracking-wide">{product.name}</h1>

          <p className="mb-6 text-2xl font-medium">€{product.price.toFixed(2)}</p>

          <p className="mb-8 text-sm leading-7">{product.description}</p>

          <Button variant="addToBag" type="button">
            {en.product.addToBag}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
