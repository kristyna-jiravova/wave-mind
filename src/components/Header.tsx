import Link from "next/link";
import Image from "next/image";
import { UserRound, ShoppingBasket, Menu } from "lucide-react";

import { ScrollNavbar } from "./ScrollNavbar";
import en from "../../i18n/local/en.json";

export const Header = () => {
  return (
    <header className="relative h-75 sm:h-100 lg:h-137.5">
      <ScrollNavbar>
        <nav className="text-navy flex gap-8">
          <ul className="hidden items-center gap-8 font-semibold md:flex">
            <li>
              <a href="/shop">{en.navigation.shop}</a>
            </li>
            <li>
              <a href="/about">{en.navigation.about}</a>
            </li>
            <li>
              <a href="/contact">{en.navigation.contact}</a>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex cursor-pointer items-center justify-center md:hidden"
              aria-label="Open and close menu"
            >
              <Menu size={18} />
            </button>

            <Link href="/login" aria-label={en.auth.signIn}>
              <UserRound size={18} />
            </Link>

            <Link href="/cart" aria-label={en.navigation.cart}>
              <ShoppingBasket size={18} />
            </Link>
          </div>
        </nav>

        <Link href="/" className="absolute top-0 right-8">
          <Image
            src="/images/logo_navy.svg"
            alt={en.logo.alt}
            width={160}
            height={40}
            className="h-auto w-24 md:w-32"
            loading="eager"
          />
        </Link>
      </ScrollNavbar>

      <div className="relative h-full w-full overflow-hidden">
        <Image
          src="/images/hero-banner-5.webp"
          alt=""
          fill
          priority
          className="object-cover object-[center_75%]"
        />
      </div>
    </header>
  );
};
