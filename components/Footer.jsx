export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-center py-12 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="font-black text-xl text-gray-900 tracking-tighter mb-4">
          HIRALAL<span className="text-primary">.</span>
        </div>
        <p className="text-sm text-gray-400 font-medium">
          &copy; {currentYear}{" "}
          <a
            href="https://www.instagram.com/sahilkalam93/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition-colors duration-200"
          >
            Sahil Kalam Company
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
