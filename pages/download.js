import Head from 'next/head';
import { useState } from 'react';
import { motion } from 'framer-motion';

// --- SVGs (Only Essential Icons Kept) ---
const SmartphoneIcon = () => (
  <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m0 0l-1.5-1.5M12 15l1.5-1.5" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 10.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// WhatsApp Icon Added
const WhatsappIcon = () => (
  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// --- Animation Configs ---
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function DownloadPage() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [statusText, setStatusText] = useState('Download Now');

  const triggerDownload = () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setStatusText('Preparing Download...');

    setTimeout(() => {
      const anchor = document.createElement('a');
      anchor.href = '/Hlinks.apk';
      anchor.download = 'Hlinks.apk';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      setStatusText('Download Started');

      setTimeout(() => {
        setIsDownloading(false);
        setStatusText('Download Now');
      }, 2000);
    }, 1500);
  };

  // WhatsApp Share Function
  const handleWhatsappShare = () => {
    const shareText = "Install it now, all latest links on Hlinks app";
    // current url nikalne ke liye (ताकि यूजर लिंक पर क्लिक करके सीधे यहाँ आ सके)
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const fullMessage = `${shareText}\n\n👇 Download Link:\n${currentUrl}`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans relative overflow-x-hidden selection:bg-blue-500/10 selection:text-blue-900 antialiased flex flex-col justify-between">
      <Head>
        <title>Download Hlinks APK</title>
        <meta name="description" content="Download the latest Hlinks Android Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Premium Light Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 30, -10, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[-5%] w-[45vw] h-[45vw] min-w-[300px] min-h-[300px] bg-gradient-to-br from-blue-400/10 to-indigo-400/5 rounded-full blur-[60px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] right-[-5%] w-[50vw] h-[50vw] min-w-[350px] min-h-[350px] bg-gradient-to-tl from-indigo-400/10 to-blue-400/5 rounded-full blur-[80px]"
        />
        {/* Subtle Overlay Grid lines pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      {/* Main Container Card */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-12 sm:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.05)] rounded-[32px] p-6 sm:p-8 flex flex-col items-center"
        >
          {/* Top Floating Smartphone Container */}
          <motion.div
            variants={itemVariants}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.03 }}
            className="w-20 h-20 rounded-2xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center relative group cursor-pointer mb-5"
          >
            <div className="absolute inset-0 rounded-2xl bg-blue-500/[0.04] blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <SmartphoneIcon />
          </motion.div>

          {/* Typography Headers */}
          <motion.h1 variants={itemVariants} className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 text-center">
            Hlinks APK
          </motion.h1>

          <motion.div variants={itemVariants} className="flex gap-2 mt-2.5 mb-6 items-center">
            <span className="px-2.5 py-0.5 text-xs font-medium bg-slate-100 border border-slate-200 text-slate-700 rounded-full">
              Stable v2.0
            </span>
            <span className="px-2.5 py-0.5 text-xs font-medium bg-slate-100 border border-slate-200 text-slate-700 rounded-full">
              5 MB
            </span>
          </motion.div>

          {/* Action Download Button */}
          <motion.div variants={itemVariants} className="w-full relative">
            <motion.button
              onClick={triggerDownload}
              disabled={isDownloading}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              className="w-full h-12 relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 disabled:pointer-events-none"
            >
              {!isDownloading && (
                <motion.div
                  className="absolute inset-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/[0.15] to-transparent transform -skew-x-12"
                  animate={{ left: ['-40%', '140%'] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                />
              )}

              {isDownloading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="text-white font-normal">{statusText}</span>
                </>
              ) : (
                <>
                  <DownloadIcon />
                  <span>{statusText}</span>
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Minimal Features Text Badges */}
          <motion.div variants={itemVariants} className="flex justify-center gap-4 w-full mt-5 text-xs font-medium text-slate-500">
            <span>• Secure File</span>
            <span>• No Ads</span>
            <span>• Verified Official</span>
          </motion.div>

          {/* Action Buttons Container (WhatsApp Share + YouTube Tutorial) */}
          <motion.div variants={itemVariants} className="w-full mt-6 pt-5 border-t border-slate-100 flex flex-col gap-3">
            
            {/* WhatsApp Share Button */}
            <button 
              onClick={handleWhatsappShare}
              className="w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#22c35e] flex items-center justify-center gap-2 text-sm font-medium text-white shadow-sm transition-colors duration-200"
            >
              <WhatsappIcon />
              Share on WhatsApp
            </button>

            {/* YouTube Video CTA Section */}
            <a 
              href="https://youtube.com/shorts/dwLj_-B0qf0?si=Ie_TuFP3KQk5he83" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full h-11 rounded-xl bg-[#FF0000] hover:bg-[#E60000] flex items-center justify-center gap-2 text-sm font-medium text-white shadow-sm transition-colors duration-200"
            >
              <YoutubeIcon />
              Watch Installation Video Tutorial
            </a>
          </motion.div>

          {/* Elegant Light Warning Box */}
          <motion.div 
            variants={itemVariants}
            className="w-full mt-4 p-3.5 bg-amber-50/60 border border-amber-200/70 rounded-xl flex gap-2.5 items-start"
          >
            <p className="text-xs text-amber-800 leading-relaxed">
              If Chrome displays a security warning saying the file might be harmful, simply tap <strong className="text-amber-900 font-semibold">"Keep Anyway"</strong>. The Hlinks APK is fully safe and secure.
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}