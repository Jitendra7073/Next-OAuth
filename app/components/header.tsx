import Image from "next/image";
import Link from "next/link";
import UserAuthButtons from "./userAuthButtons";
import MobileMenu from "./mobileMenu";
import ModeToggle from "./themeToggle";

const Header = () => {
  const NavLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/v1/about" },
    { label: "Products", href: "/v1/products" },
  ];

  return (
    <header className="sticky top-0 z-50  shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className=" p-2 rounded">
                <Image src="/vercel.svg" width={20} height={20} alt="Logo" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 items-center">
            {NavLinks.map((link, index) => {
              return (
                <Link
                  key={index}
                  href={link.href}
                  className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition whitespace-nowrap">
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex justify-center items-center gap-4">
            <UserAuthButtons />
            <ModeToggle />
          </div>

          {/* Mobile Menu */}
          <MobileMenu navLinks={NavLinks}>
            <UserAuthButtons />
          </MobileMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
