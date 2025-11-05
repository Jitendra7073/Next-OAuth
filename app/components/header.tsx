import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import UserAuthButtons from "./userAuthButtons";

const Header = () => {
  const NavLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Products", href: "/products" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gray-900 p-2 rounded">
              <Image src="/vercel.svg" width={20} height={20} alt="Logo" />
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex gap-4">
          {NavLinks.map((link, index) => {
            return (
              <Link
                key={index}
                href={link.href}
                className="px-4 py-2 rounded hover:bg-gray-100 transition">
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex">
          <UserAuthButtons />
        </div>
      </div>
    </header>
  );
};

export default Header;
