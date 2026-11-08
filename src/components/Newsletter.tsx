import Image from "next/image";

import { NewsletterForm } from "./NewsletterForm";
import en from "../../i18n/local/en.json";

export const Newsletter = () => {
  return (
    <section className="relative grid min-h-47.5 w-full place-items-center overflow-hidden px-6 py-8 text-center text-white max-sm:min-h-52.5 sm:min-h-52.5">
      <Image
        src="/images/newsletter-background.webp"
        alt={en.newsletter.backgroundImageAlt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="bg absolute inset-0 bg-black/60" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-105 flex-col items-center justify-center text-center">
        <h2 className="text-[28px] font-light tracking-[-0.02em]">{en.newsletter.title}</h2>
        <p className="mt-1 mb-3 text-[11px]">{en.newsletter.description}</p>
        <NewsletterForm />
      </div>
    </section>
  );
};
