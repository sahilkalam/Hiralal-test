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
      delayChildren: 0.2,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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
        setData(Array.isArray(d) ? d : []);
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
        <title>Link Directory | Hiralal Providers</title>
        <meta name="description" content="Browse the complete directory list of all updated links provided by Hiralal Providers." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hiralal-app.vercel.app/links" />
      </Head>

      <main className="min-h-screen bg-[#f9fafb] px-6 py-12 md:py-24 antialiased selection:bg-primary selection:text-white">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={pageContainerVariants}
          className="w-full max-w-4xl mx-auto space-y-12"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-8 space-y-6 md:space-y-0">
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
                Link <span className="text-primary">Directory</span>
              </h1>
              <p className="text-sm font-medium text-gray-400">
                A comprehensive collection of all active link provisions
              </p>
            </div>
            
            <Link href="/" passHref legacyBehavior>
              <a className="inline-flex items-center text-xs font-black uppercase tracking-widest text-gray-500 hover:text-primary transition-all py-3 px-6 bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-md outline-none focus:ring-4 focus:ring-primary/10">
                ← Home Base
              </a>
            </Link>
          </motion.div>

          {/* Grid Layout */}
          <div className="min-h-[400px] relative">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeleton-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="bg-white/50 p-8 rounded-3xl border border-gray-100 flex justify-between items-center shadow-sm backdrop-blur-sm">
                      <div className="h-6 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-6 animate-pulse"></div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="list-view"
                  variants={pageContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {safeData.map((item, i) => (
                    <motion.div
                      key={item?.slug || i}
                      variants={itemVariants}
                      layout 
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white rounded-3xl shadow-sm border border-gray-200 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 overflow-hidden group"
                    >
                      <Link href={`/links/${item?.slug || ''}`} passHref legacyBehavior>
                        <a className="block p-8 group outline-none focus:ring-4 focus:ring-primary/10">
                          <div className="flex justify-between items-center space-x-4">
                            <span className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 break-words min-w-0 flex-1 leading-snug">
                              {item?.title || "Untitled Provision"}
                            </span>
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                                <span className="text-gray-400 group-hover:text-primary transform group-hover:translate-x-1 transition-all duration-300 text-2xl font-black">
                                    →
                                </span>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {!loading && safeData.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200"
                >
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No provisions found at this time.</p>
                </motion.div>
            )}
          </div>
          
        </motion.div>
      </main>
    </>
  )
}
