import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Head from "next/head"

export default function SlugPage() {
  const router = useRouter();
  const { slug } = router.query;

  // 1. Move state declarations to the top
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 2. Define currentItem from the fetched data array
  const currentItem = data.length > 0 ? data[0] : null;

  // 3. Now you can safely use loading and currentItem
  const pageTitle = loading 
    ? "Loading Details..." 
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
        {/* Dynamic SEO Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://hiralal-app.onrender.com/links/${slug || ''}`} />

        {/* Textual Open Graph Tags for Social/Vercel Cards */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://hiralal-app.onrender.com/links/${slug || ''}`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />

        {/* Twitter Card Layout */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 antialiased">
        <div className="w-full max-w-md">
          
          {/* Back to Home Button */}
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-800 mb-6 transition-colors">
            ← Back to Home
          </Link>

          {loading && (
            <div className="text-center py-8 text-gray-500 font-medium">
              Loading details...
            </div>
          )}

          {!loading && data.length === 0 && (
            <div className="bg-white p-6 rounded-2xl border text-center text-gray-500 shadow-sm">
              Link not found! 😕
            </div>
          )}

          {/* Dynamic Card Layout */}
          {!loading && data.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 space-y-6 mb-6"
            >
              {/* Header */}
              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md uppercase tracking-wide">
                  Link Info
                </span>
                <h1 className="text-2xl font-black text-gray-900 mt-3 capitalize">
                  {item.title}
                </h1>
              </div>

              {/* Description/Content */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.content}
                </p>
              </div>

              {/* Action Button */}
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full bg-gray-900 hover:bg-gray-800 text-white text-center font-semibold py-3.5 rounded-2xl shadow-md transition-all duration-200"
                >
                  View ↗
                </a>
              )}
              
              {/* Meta info */}
              <div className="text-[11px] text-gray-400 text-center uppercase tracking-wider">
                Slug: {item.slug}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}