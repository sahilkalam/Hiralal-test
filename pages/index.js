import { motion, AnimatePresence } from "framer-motion"
import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from 'react'
import app from "../firebase/firebaseClient"

// Main Page Entry Animations
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

const pageItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.215, 0.610, 0.355, 1.000], 
    }
  }
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fcmToken, setFcmToken] = useState('');
  const [liveNotification, setLiveNotification] = useState(null);

  useEffect(() => {
    const fetchAllLinks = async () => {
      try {
        let res = await fetch(`/api/data`)
        if (!res.ok) throw new Error('Network response was not ok');
        let d = await res.json()
        setData(Array.isArray(d) ? d : []);
      } catch (error) {
        console.error("Data fetch error:", error);
        setData([]); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllLinks();
  }, [])

  useEffect(() => {
    const setupNotification = async () => {
      if (typeof window !== 'undefined') {
        try {
          const { getMessaging, getToken, onMessage, isSupported } = await import('firebase/messaging');
          const supported = await isSupported();
          if (!supported) return;
          const messaging = getMessaging(app);
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            const token = await getToken(messaging, {
              vapidKey: 'BNOpC1eVbkSbQX5S8G34jWl5a-pegKabHDDSsqGQYgeKsxUlMoMKWoNFBQDrYFCPxGbZVgaaY5mqH1YtoPCAvIA' 
            });
            if (token) setFcmToken(token);
          }
          const unsubscribe = onMessage(messaging, (payload) => {
            setLiveNotification(payload.notification);
            setTimeout(() => setLiveNotification(null), 6000);
          });
          return () => unsubscribe();
        } catch (err) {
          console.error("Error setting up FCM: ", err);
        }
      }
    };
    setupNotification();
  }, []);

  const safeData = Array.isArray(data) ? data : [];

  return (
    <>
      <Head>
        <title>Hiralal Links Providers | Latest Links & Updates</title>
        <meta name="description" content="Get the latest links and featured updates provided by Hiralal Kumar Bharti Paswan (choco wala)." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hiralal-app.onrender.com/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hiralal-app.onrender.com/" />
        <meta property="og:title" content="Hiralal Links Providers" />
        <meta property="og:description" content="Latest links by Hiralal Kumar Bharti Paswan || choco wala" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Hiralal Links Providers" />
        <meta name="twitter:description" content="Latest links by Hiralal Kumar Bharti Paswan || choco wala" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-6 py-12 antialiased selection:bg-primary selection:text-white relative overflow-hidden">
        
        {/* Animated background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[100px]" />
        </div>

        <AnimatePresence>
          {liveNotification && (
            <motion.div 
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-24 left-4 right-4 mx-auto max-w-sm bg-white/90 backdrop-blur-md border-l-4 border-primary rounded-2xl shadow-2xl p-5 z-50 flex flex-col space-y-1"
            >
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">New Update</span>
              <h4 className="text-sm font-bold text-gray-900">{liveNotification.title}</h4>
              <p className="text-xs text-gray-600">{liveNotification.body}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={pageContainerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg space-y-12 flex flex-col justify-center relative z-10"
        >
          {/* Title Header */}
          <motion.div variants={pageItemVariants} className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none">
              Hiralal <span className="text-primary">Links</span>
            </h1>
            <p className="text-base font-medium text-gray-500 max-w-sm mx-auto leading-relaxed">
              Premium Link Provisioning by Hiralal Kumar Bharti Paswan || choco wala
            </p>
          </motion.div>

          {/* Main Card Interface */}
          <motion.div variants={pageItemVariants} className="w-full space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xs font-black uppercase tracking-widest text-gray-400">
                Featured Updates
              </h2>
              <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                <span className={`h-2 w-2 rounded-full ${isLoading ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`}></span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">{isLoading ? 'Syncing' : 'Live'}</span>
              </div>
            </div>

            {/* List Wrapper */}
            <div className="space-y-4 min-h-[160px]">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="skeleton-home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 w-full"
                  >
                    {[1, 2].map((n) => (
                      <div key={n} className="bg-white/50 p-6 rounded-3xl border border-gray-100 flex justify-between items-center shadow-sm backdrop-blur-sm">
                        <div className="h-5 bg-gray-200 rounded-full w-2/3 animate-pulse"></div>
                        <div className="h-5 bg-gray-200 rounded-full w-5 animate-pulse"></div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="links-home"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    className="space-y-4 w-full"
                  >
                    {safeData.slice(0, 2).map((item, i) => (
                      <motion.div
                        key={item?.slug || i}
                        variants={pageItemVariants}
                        layout
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white rounded-3xl shadow-sm border border-gray-200 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 overflow-hidden group"
                      >
                        <Link href={`/links/${item?.slug || ''}`} passHref legacyBehavior>
                          <a className="block p-6 outline-none focus:ring-4 focus:ring-primary/10">
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                                {item?.title || "Untitled Link"}
                              </span>
                              <div className="w-10 h-10 rounded-2xl bg-gray-50 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-300">
                                <span className="text-gray-400 group-hover:text-primary transform group-hover:translate-x-0.5 transition-all duration-300 text-xl font-black">
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
            </div>

            {/* Action Links */}
            {!isLoading && safeData.length > 2 && (
              <motion.div variants={pageItemVariants} className="text-center">
                <Link href="/links" passHref legacyBehavior>
                  <a className="inline-flex items-center px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition-all duration-300">
                    <span>View All {safeData.length} Provisions</span>
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </Link>
              </motion.div>
            )}

            {/* Contact Button */}
            <motion.div variants={pageItemVariants} className="pt-6 text-center">
              <Link href="/contact" passHref legacyBehavior>
                <a className="group w-full inline-flex items-center justify-center rounded-3xl bg-gray-900 px-8 py-5 text-white font-bold shadow-2xl shadow-gray-200 transition-all duration-300 hover:bg-primary hover:shadow-primary/20 outline-none focus:ring-4 focus:ring-primary/30">
                  <span>Contact Our Team</span>
                  <span className="ml-3 text-xl transition-transform duration-300 group-hover:translate-x-2">→</span>
                </a>
              </Link>
            </motion.div>

          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
