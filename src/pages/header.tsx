export default function Header() {
  const navItems = [
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-6">
        <div
          className="bg-gradient-to-tl from-purple-400 to-pink-600"
          style={{
            maskImage: "url('/p_logo.svg')",
            maskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskImage: "url('/p_logo.svg')",
            width: "150px",
            height: "60px",
          }}
        />
        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
