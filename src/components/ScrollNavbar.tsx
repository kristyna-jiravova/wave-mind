"use client";

import { ReactNode, useEffect, useState } from "react";

type ScrollNavbarProps = {
  children: ReactNode;
};

export const ScrollNavbar = ({ children }: ScrollNavbarProps) => {
  const [scrollY, setScrollY] = useState(0);

  const opacity = 0.3 + Math.min(scrollY / 100, 1) * 0.5;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 z-50 flex h-16 w-full items-center px-4 backdrop-blur-sm md:h-20 md:justify-center"
      style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}
    >
      {children}
    </div>
  );
};
