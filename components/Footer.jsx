export default function Footer() {
  // Har saal manual change na karna pade, isliye dynamic year nikala hai
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-center text-sm text-gray-500 py-6 border-t border-gray-100">
      <p>
        &copy; {currentYear}{" "}
        <a 
          href="https://www.instagram.com/sahilkalam93/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-medium hover:text-gray-800 hover:underline transition-colors duration-200"
        >
          Sahil Kalam Company
        </a>
      </p>
    </footer>
  );
}