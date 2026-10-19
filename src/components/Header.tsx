"use client";

import { useEffect, useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { UserRound, ShoppingBasket, Menu } from "lucide-react";


export const Header = () => {
  
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
  return (
    <header className="relative h-75 sm:h-100 lg:h-137.5">

      <div className={`fixed top-0 z-50 grid w-full grid-cols-3 items-center ${isScrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-transparent'} px-8 py-0`}>
        <nav className="col-start-2 justify-self-center hidden md:block text-[#173851]">
          <ul className="flex items-center gap-8 font-semibold">
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
        </nav>


        <div className="col-start-1 md:col-start-3 row-start-1 flex items-center gap-3 justify-self-start lg:justify-self-auto text-white lg:text-[#173851] pl-0 sm:pl-6 md:pl-8 lg:-translate-x-15">
          <button 
          type="button" 
          className="flex size-11 items-center justify-center lg:hidden"
          aria-label="Open and close menu">

          <Menu size={18} />
          </button>

          <UserRound size={18}/>
          <ShoppingBasket size={18}/>
        
        </div>
          
        <Link href="/" className="col-start-3 row-start-1 justify-self-end self-start translate-x-6 md:-translate-x-20">
          <Image 
            src="/images/logo_navy.svg"
            alt="logo_navy" 
            width={160}
            height={40}
            className="w-24 md:w-32 h-auto"
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


