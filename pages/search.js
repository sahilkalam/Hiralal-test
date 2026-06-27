import { useState } from "react"
import { useRouter } from "next/router" // Next.js 10/Pages Router के लिए बिल्कुल सही है
import { motion } from "framer-motion"
import Head from "next/head"

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchValue.trim()) {
      // बटन क्लिक या Enter दबाते ही /links/slug-value पर रीडायरेक्ट करेगा
      router.push(`/links/${encodeURIComponent(searchValue.trim())}`)
    }
  }

  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>Search Links | Hiralal App</title>
        <meta name="description" content="Search and find all the links uploaded on Hiralal links platform quickly by entering their slug." />
        <meta name="keywords" content="Hiralal links, search links, slug search, links tracker" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook / Vercel Previews */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Search Links | Hiralal App" />
        <meta property="og:description" content="Search and find all the links uploaded on Hiralal links platform." />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Search Links | Hiralal App" />
        <meta name="twitter:description" content="Search and find all the links uploaded on Hiralal links platform." />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-6 antialiased">
        
        {/* Framer Motion Container: स्मूथ एंट्री एनीमेशन */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-100"
        >
          {/* Header Title Section */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight mb-2">
              Hiralal Links Search
            </h1>
            <p className="text-gray-500 text-sm">
              Search links uploaded on Hiralal links by its slug
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter link slug here..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-800 placeholder-gray-400 bg-gray-50/50"
                required
              />
            </div>

            {/* Framer Motion Animated Submit Button */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-colors shadow-lg shadow-blue-100 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Search Links</span>
              
              {/* Modern Search Icon SVG */}
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </motion.button>
          </form>
        </motion.div>
        
      </main>
    </>
  )
}