import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Links", href: "/links" },
    { name: "Search", href: "/search" },
    { name: "Download", href: "/download" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"}`}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="font-black text-2xl text-gray-900 tracking-tighter">
          <Link href="/">
            HIRALAL<span className="text-primary">.</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8 font-semibold text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`hover:text-primary transition-colors relative group ${router.pathname === link.href ? "text-primary" : ""}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${router.pathname === link.href ? "w-full" : ""}`}></span>
            </Link>
          ))}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-lg bg-gray-50"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-50 px-6 py-6 space-y-4 flex flex-col font-bold text-gray-700 shadow-xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`hover:text-primary transition-colors block text-lg ${router.pathname === link.href ? "text-primary" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
