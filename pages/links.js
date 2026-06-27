import { motion, AnimatePresence } from "framer-motion"
import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from 'react'

const pageContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      delayChildren: 1, 
    }
  }
}

const premiumItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8, // Premium slow pacing applied
      ease: [0.16, 1, 0.3, 1],
    }
  }
}

export default function LinksArchive() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllLinks = async () => {
      try {
        let res = await fetch(`/api/data`)
        if (!res.ok) throw new Error('Directory fetch error');
        let d = await res.json()
        
        if (Array.isArray(d)) {
          setData(d)
        } else {
          setData([])
        }
      } catch (error) {
        console.error("Directory loading error:", error);
        setData([]); 
      } finally {
        setTimeout(() => setLoading(false), 200);
      }
    };
    fetchAllLinks();
  }, [])

  const safeData = Array.isArray(data) ? data : [];

  return (
    <>
      <Head>
        <title>All Directory Links | Hiralal Providers</title>
        <meta name="description" content="Browse the complete directory list of all updated links provided by Hiralal Providers." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hiralal-app.vercel.app/links" />
      </Head>

      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 antialiased selection:bg-blue-500 selection:text-white">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={pageContainerVariants}
          className="w-full max-w-md space-y-6 flex flex-col justify-center"
        >
          {/* Header Section */}
          <motion.div variants={premiumItemVariants} className="flex items-center justify-between border-b border-gray-200 pb-4 space-x-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight break-words">
                Link Directory
              </h1>
              <p className="text-xs font-medium text-gray-400 mt-1 break-words">
                All updated provisions listed below
              </p>
            </div>
            
            <Link href="/" passHref legacyBehavior>
              <a className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors py-1.5 px-3 bg-white border border-gray-200 rounded-full shadow-sm flex-shrink-0 outline-none focus:ring-2 focus:ring-gray-300">
                ← Home
              </a>
            </Link>
          </motion.div>

          {/* Dynamic Content Grid using Map */}
          <div className="space-y-3 min-h-[250px] relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="archive-skeleton-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 w-full"
                >
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-6 animate-pulse"></div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="archive-list-view"
                  variants={pageContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className="space-y-3 w-full"
                >
                  {safeData.map((item, i) => (
                    <motion.div
                      key={item?.slug || i}
                      variants={premiumItemVariants} 
                      layout 
                      whileHover={{ scale: 1.015, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden"
                    >
                      <Link href={`/links/${item?.slug || ''}`} passHref legacyBehavior>
                        <a className="block p-5 group outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl">
                          <div className="flex justify-between items-center space-x-4">
                            <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-150 text-base break-words min-w-0 flex-1 leading-snug">
                              {item?.title || "Untitled Link"}
                            </span>
                            <span className="text-gray-400 group-hover:text-blue-500 text-sm transform group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0">
                              ➔
                            </span>
                          </div>
                        </a>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </motion.div>
      </main>
    </>
  )
}