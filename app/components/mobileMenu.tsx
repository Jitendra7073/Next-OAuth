"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
  children: React.ReactNode;
}

export default function MobileMenu({ navLinks, children }: MobileMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden p-2 rounded hover:bg-gray-100 transition"
        aria-label="Toggle mobile menu">
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute md:hidden w-full left-0 top-15 bg-white flex flex-col justify-center items-center py-5 transition shadow-xl">
          <nav className="flex flex-col justify-center items-center gap-2">
            {navLinks.map((link, index) => {
              return (
                <Link
                  key={index}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="px-4 py-2 rounded hover:bg-gray-100 transition w-full text-center">
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 px-4" onClick={closeMobileMenu}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
