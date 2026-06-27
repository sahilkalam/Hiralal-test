import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  // मोबाइल मेन्यू ओपन/क्लोज करने के लिए स्टेट
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Brand Name */}
        <div className="font-extrabold text-xl text-gray-900 tracking-tight">
          <Link href="/">
            Hiralal Links
          </Link>
        </div>

        {/* Desktop Navigation Links (बड़ी स्क्रीन के लिए - md:flex, मोबाइल पर hidden) */}
        <div className="hidden md:flex items-center space-x-6 font-semibold text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
          <Link href="/search" className="hover:text-blue-600 transition-colors">
            Search
          </Link>
          <Link href="/download" className="hover:text-blue-600 transition-colors">
          Download
          </Link>
        </div>

        {/* Hamburger Menu Button (सिर्फ मोबाइल के लिए - md:hidden) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {/* बटन का आइकॉन: ओपन होने पर 'X' और क्लोज होने पर '☰' (Hamburger) दिखेगा */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links (सिर्फ मोबाइल पर दिखेगा जब isOpen true होगा) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 flex flex-col font-semibold text-gray-600 shadow-inner">
          <Link 
            href="/" 
            className="hover:text-blue-600 transition-colors block"
            onClick={() => setIsOpen(false)} // लिंक पर क्लिक करते ही मेन्यू बंद हो जाएगा
          >
            Home
          </Link>
          <Link 
            href="/contact" 
            className="hover:text-blue-600 transition-colors block"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link 
            href="/search" 
            className="hover:text-blue-600 transition-colors block"
            onClick={() => setIsOpen(false)}
          >
            Search
          </Link>
          <Link 
            href="/download" 
            className="hover:text-blue-600 transition-colors block"
            onClick={() => setIsOpen(false)}
          >
            Download
          </Link>
        </div>
      )}
    </nav>
  );
}