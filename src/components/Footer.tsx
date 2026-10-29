import Link from "next/link";

import en from "../../i18n/local/en.json";

export const Footer = () => {
  return (
    <footer className="bg-navy w-full px-4 py-6 text-white">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:px-16">
          <div className="text-sm">
            <p className="max-w-220px text-sm leading-6 text-white/90">{en.footer.motto}</p>
          </div>

          <nav
            aria-label="Footer information"
            className="grid grid-cols-1 gap-x-12 gap-y-2 text-sm sm:grid-cols-2"
          >
            <Link href="/shipping">{en.footer.shipping}</Link>
            <Link href="/size-guide">{en.footer.sizeGuide}</Link>
            <Link href="/privacy-policy">{en.footer.privacyPolicy}</Link>
            <Link href="/terms">{en.footer.termsAndConditions}</Link>
          </nav>
        </div>

        <div className="mx-auto mt-6 w-full max-w-5xl">
          <hr className="border-white/30" />
          <p className="pt-3 text-xs">{en.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};
