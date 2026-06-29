import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Head from "next/head"

export default function SlugPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const currentItem = data.length > 0 ? data[0] : null;

  const pageTitle = loading 
    ? "Syncing Details..."
    : currentItem?.title 
      ? `${currentItem.title} | Hiralal Links` 
      : "Link Details | Hiralal Providers";

  const pageDescription = currentItem?.content 
    ? currentItem.content.substring(0, 150) 
    : "View dynamic link details, features updates, and content directory managed by Hiralal Providers.";

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return; 

      setLoading(true);
      try {
        let res = await fetch(`/api/data?q=${slug}`);
        let result = await res.json();

        if (res.ok) {
          setData(result); 
        } else {
          console.error("API Error:", result.error);
        }
      } catch (error) {
        console.error("Fetch fail ho gaya:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://hiralal-app.onrender.com/links/${slug || ''}`} />
      </Head>
      
      <main className="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-center p-6 antialiased selection:bg-primary selection:text-white">
        <div className="w-full max-w-xl">
          
          <Link href="/links" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary mb-10 transition-colors py-2 px-4 rounded-full bg-white shadow-sm border border-gray-100">
            ← Back to Directory
          </Link>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-xs font-black uppercase tracking-widest text-gray-400">Retrieving Provision...</p>
            </div>
          )}

          {!loading && data.length === 0 && (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-[2.5rem] border border-gray-100 text-center space-y-6 shadow-xl shadow-gray-200/50"
            >
              <div className="text-6xl">😕</div>
              <h2 className="text-2xl font-black text-gray-900">Provision Not Found</h2>
              <p className="text-gray-500 font-medium">The requested link might have been moved or doesn't exist in our database.</p>
              <Link href="/" className="inline-block bg-gray-900 text-white font-black py-4 px-8 rounded-2xl hover:bg-black transition-all">
                  Return Home
              </Link>
            </motion.div>
          )}

          {!loading && data.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[3rem] p-10 md:p-12 shadow-2xl shadow-gray-200/60 border border-gray-50 space-y-10 relative overflow-hidden"
            >
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-indigo-500" />

              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-primary/5 px-4 py-2 rounded-xl">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Active Provision</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight capitalize">
                  {item.title}
                </h1>
              </div>

              <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100/50">
                <p className="text-base text-gray-600 leading-relaxed font-medium">
                  {item.content}
                </p>
              </div>

              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="group block w-full bg-primary hover:bg-primary-dark text-white text-center font-black py-5 rounded-[1.5rem] shadow-xl shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center space-x-3 text-lg"
                >
                  <span>Access Provision</span>
                  <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              )}
              
              <div className="flex items-center justify-between pt-4">
                  <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    Reference ID: <span className="text-gray-400">{item.slug}</span>
                  </div>
                  <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300 hover:text-primary transition-colors cursor-help" title="Verified Provision">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.9L9.03 1.28a2 2 0 011.938 0l6.865 3.618a1 1 0 01.526.882v7.708a2 2 0 01-1.106 1.789l-6.29 3.145a2 2 0 01-1.789 0l-6.29-3.145A2 2 0 011 13.47V5.782a1 1 0 01.526-.882zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );
}
