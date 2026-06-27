import { motion, AnimatePresence } from "framer-motion"
import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { app } from "../firebase/firebaseClient" // Firebase connection import kiya

// Main Page Entry Animations
const pageContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      delayChildren: 0.4,
    }
  }
}

const pageItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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
  const [fcmToken, setFcmToken] = useState(''); // Token store karne ke liye state
  const [liveNotification, setLiveNotification] = useState(null); // Live notification pop-up state

  // EFFECT 1: Fetching Links Data (Aapka Existing Logic)
  useEffect(() => {
    const fetchAllLinks = async () => {
      try {
        let res = await fetch(`/api/data`)
        if (!res.ok) throw new Error('Network response was not ok');
        let d = await res.json()
        
        if (Array.isArray(d)) {
          setData(d)
        } else {
          setData([])
        }
      } catch (error) {
        console.error("Data fetch error:", error);
        setData([]); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllLinks();
  }, [])

  // EFFECT 2: Firebase Cloud Messaging Integration
  useEffect(() => {
    const setupNotification = async () => {
      if (typeof window !== 'undefined') {
        try {
          const { getMessaging, getToken, onMessage, isSupported } = await import('firebase/messaging');
          
          const supported = await isSupported();
          if (!supported) return;

          const messaging = getMessaging(app);

          // Request Notification Permission
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            // NOTE: 'YOUR_PUBLIC_VAPID_KEY' ko Firebase Console -> Cloud Messaging se badlein
            const token = await getToken(messaging, {
              vapidKey: 'BNOpC1eVbkSbQX5S8G34jWl5a-pegKabHDDSsqGQYgeKsxUlMoMKWoNFBQDrYFCPxGbZVgaaY5mqH1YtoPCAvIA' 
            });

            if (token) {
              setFcmToken(token);
              console.log("FCM Device Token Generated successfully:", token);
            }
          }

          // Handle Foreground Notification (Jab user app par live ho)
          const unsubscribe = onMessage(messaging, (payload) => {
            console.log('Foreground notification payload received: ', payload);
            setLiveNotification(payload.notification);
            
            // Auto hide notification card after 6 seconds
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

      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 antialiased selection:bg-blue-500 selection:text-white relative">
        
        {/* Real-time Dynamic Foreground Toast Alert */}
        <AnimatePresence>
          {liveNotification && (
            <motion.div 
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="absolute top-4 left-4 right-4 mx-auto max-w-sm bg-white border-l-4 border-blue-500 rounded-xl shadow-xl p-4 z-50 flex flex-col space-y-1"
            >
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">New Live Notification</span>
              <h4 className="text-sm font-bold text-gray-900">{liveNotification.title}</h4>
              <p className="text-xs text-gray-600">{liveNotification.body}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={pageContainerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md space-y-8 flex flex-col justify-center"
        >
          {/* Title Header */}
          <motion.div variants={pageItemVariants} className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Hiralal Links Providers
            </h1>
            <p className="text-sm font-medium text-gray-400 max-w-xs mx-auto">
              Latest links by Hiralal Kumar Bharti Paswan || choco wala
            </p>
          </motion.div>

          {/* Main Card Interface */}
          <motion.div variants={pageItemVariants} className="w-full space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2 px-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Featured Updates
              </h2>
              <span className={`h-2 w-2 rounded-full transition-colors duration-300 ${isLoading ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`}></span>
            </div>

            {/* List Wrapper */}
            <div className="space-y-3 min-h-[160px] relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="skeleton-home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 w-full"
                  >
                    {[1, 2].map((n) => (
                      <div key={n} className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
                        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
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
                    className="space-y-3 w-full"
                  >
                    {safeData.slice(0, 2).map((item, i) => (
                      <motion.div
                        key={item?.slug || i}
                        variants={pageItemVariants}
                        layout
                        whileHover={{ scale: 1.015, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden"
                      >
                        <Link href={`/links/${item?.slug || ''}`} passHref legacyBehavior>
                          <a className="block p-5 group outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-150 text-base">
                                {item?.title || "Untitled Link"}
                              </span>
                              <span className="text-gray-400 group-hover:text-blue-500 text-sm transform group-hover:translate-x-0.5 transition-all duration-150">
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

            {/* Action Links */}
            {!isLoading && safeData.length > 2 && (
              <motion.div variants={pageItemVariants} className="text-center pt-2">
                <Link href="/links" passHref legacyBehavior>
                  <a className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 space-x-1 group py-2 outline-none">
                    <span>View All {safeData.length} Links</span>
                    <span className="transform group-hover:translate-x-0.5 transition-transform">➔</span>
                  </a>
                </Link>
              </motion.div>
            )}

            {/* Contact Button */}
            <motion.div variants={pageItemVariants} className="pt-4 text-center">
              <Link href="/contact" passHref legacyBehavior>
                <a className="group inline-flex items-center justify-center rounded-full bg-blue-50 px-6 py-3 text-blue-700 font-semibold border border-blue-200 shadow-sm transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 outline-none focus:ring-2 focus:ring-blue-500">
                  <span>Contact Us</span>
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </Link>
            </motion.div>

          </motion.div>
        </motion.div>
      </main>
    </>
  );
}