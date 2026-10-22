"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserRound, ShoppingBasket, Menu } from "lucide-react";

export const Header = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const opacity = 0.3 + Math.min(scrollY / 100, 1) * 0.5;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="relative h-75 sm:h-100 lg:h-137.5">
      <div
        className="fixed top-0 z-50 flex h-16 w-full px-4 items-center backdrop-blur-sm md:h-20 md:justify-center"
        style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}
      >
        <nav className="flex gap-8 text-navy">
          <ul className="hidden items-center gap-8 font-semibold md:flex">
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
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

            <Link href="/login" aria-label="User login">
              <UserRound size={18} />
            </Link>

            <Link href="/cart" aria-label="Shopping cart">
              <ShoppingBasket size={18} />
            </Link>
            
          </div>
        </nav>

        <Link href="/" className="absolute top-0 right-8">
          <Image
            src="/images/logo_navy.svg"
            alt="logo_navy"
            width={160}
            height={40}
            className="h-auto w-24 md:w-32"
            loading="eager"
          />
        </Link>
      </div>

      <div className="relative h-full w-full overflow-hidden">
        <Image
          src="/images/hero-banner-4.webp"
          alt="banner"
          fill
          priority
          className="object-cover object-[center_75%]"
        />
      </div>
    </header>
  );
};
