import { useState } from "react"
import { motion } from "framer-motion"
import Head from "next/head"
import Link from "next/link"

export default function Contact() {
  const telegramMessage = encodeURIComponent("Hello, I came from hiralal-app")
  const telegramBotUrl = `https://t.me/Chat933bot?text=${telegramMessage}`

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ success: null, message: "" })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ success: null, message: "" })

    // Replace this with your Google Sheet Web App URL (Environment Variable is best)
    const googleSheetUrl = "https://script.google.com/macros/s/AKfycbzOHTFkoRZuGcqEPSL9xHOerFT7JtiBwpgWCCT0UD9qDnYkxL9rgXwDfc0ij0ZSiXnI/exec"

    try {
      const response = await fetch(googleSheetUrl, {
        method: "POST",
        mode: "no-cors", // Google App Script requires no-cors if not handling CORS manually
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      setStatus({ success: true, message: "Message sent successfully to Google Sheets!" })
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setStatus({ success: false, message: "Something went wrong. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>Contact Us | Hiralal App</title>
        <meta name="description" content="Get in touch with us via Telegram or send a direct message. We are here to help you." />
        <meta name="keywords" content="Contact, Telegram Bot, Direct Message, Google Sheets, Hiralal App" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook / Vercel Preview */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us | Hiralal App" />
        <meta property="og:description" content="Get in touch with us via Telegram or send a direct message." />
        <meta property="og:image" content="/og-image.jpg" /> {/* Add your image path here */}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Hiralal App" />
        <meta name="twitter:description" content="Get in touch with us via Telegram or send a direct message." />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-between p-6 antialiased">
        
        <div className="flex-grow flex flex-col items-center justify-center w-full max-w-4xl my-12">
          
          {/* Title */}
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight">
              Get In Touch
            </h1>
            <p className="text-gray-500 mt-2 text-lg">Choose how you want to connect with us.</p>
          </motion.div>

          {/* Grid Layout for Two Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            
            {/* OPTION 1: Telegram Option */}
            <motion.div 
              initial="hidden" animate="visible" variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between items-center text-center"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-500 text-3xl font-bold">
                  TG
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Telegram Bot</h2>
                <p className="text-gray-500">
                  Instant support standard message ke sath. Hamare Telegram bot par directly chat shuru karein.
                </p>
              </div>

              <div className="w-full pt-8">
                <a 
                  href={telegramBotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5"
                >
                  Message on Telegram
                </a>
              </div>
            </motion.div>

            {/* OPTION 2: Direct Message (Google Sheet Form) */}
            <motion.div 
              initial="hidden" animate="visible" variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center md:text-left">Direct Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <textarea 
                    name="message" rows="3" required value={formData.message} onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Type your message here..."
                  />
                </div>

                <button 
                  type="submit" disabled={loading}
                  className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {status.message && (
                  <p className={`text-sm text-center font-medium mt-2 ${status.success ? "text-green-600" : "text-red-600"}`}>
                    {status.message}
                  </p>
                )}
              </form>
            </motion.div>

          </div>

          {/* Navigation Back to Home (Next.js 10 Strict Format) */}
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mt-12">
            <Link href="/">
              <a className="text-gray-600 hover:text-gray-900 font-semibold underline transition-colors">
                ← Back to home
              </a>
            </Link>
          </motion.div>

        </div>

      </main>
    </>
  )
}