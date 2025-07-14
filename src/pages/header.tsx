import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (hash: string) => {
    setIsOpen(false);
    if (location.pathname === "/") {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = `/${hash}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-6">
        <div
          className="bg-gradient-to-tl from-purple-400 to-pink-600"
          style={{
            maskImage: "url('./p_logo.svg')",
            maskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskImage: "url('./p_logo.svg')",
            width: "150px",
            height: "60px",
          }}
        />
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-muted-foreground hover:text-primary focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {isOpen && (
        <nav className="md:hidden flex flex-col items-center gap-4 pb-4 px-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
