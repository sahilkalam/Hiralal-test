import { useState } from "react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import Head from "next/head"
import Link from "next/link"

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/links/${encodeURIComponent(searchValue.trim())}`)
    }
  }

  return (
    <>
      <Head>
        <title>Search Links | Hiralal App</title>
        <meta name="description" content="Search and find all the links uploaded on Hiralal links platform." />
      </Head>

      <main className="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-center px-6 antialiased selection:bg-primary selection:text-white relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 relative z-10"
        >
          <div className="text-center mb-10 space-y-3">
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">
              Link <span className="text-primary">Search</span>
            </h1>
            <p className="text-gray-500 font-medium text-sm">
              Discover provisions by entering their unique slug
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="e.g. latest-updates"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/20 outline-none transition-all font-bold text-gray-800 placeholder-gray-300 text-lg"
                required
              />
              <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-gray-300 group-focus-within:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-black py-5 px-8 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 text-lg"
            >
              <span>Search Database</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-50 text-center">
            <Link href="/links" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">
              Browse All Provisions →
            </Link>
          </div>
        </motion.div>
        
      </main>
    </>
  )
}
