import Link from "next/link";

import en from "../../i18n/local/en.json";

export const Footer = () => {
  return (
    <footer className="bg-navy w-full px-4 py-6 text-white">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:px-16">
          <div className="text-sm">
            <p className="max-w-220px text-sm leading-6 text-white/90"> {en.footer.motto}</p>
            {/* TODO: Add Instagram link when the profile is ready.
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37m1.5-4.87h.01" />
                </g>
              </svg>
            </a> 
            */}
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
