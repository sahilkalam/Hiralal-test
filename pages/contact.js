import { useState } from "react"
import { motion } from "framer-motion"
import Head from "next/head"
import Link from "next/link"

export default function Contact() {
  const telegramMessage = encodeURIComponent("Hello, I came from hiralal-app")
  const telegramBotUrl = `https://t.me/Chat933bot?text=${telegramMessage}`

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

    const googleSheetUrl = "https://script.google.com/macros/s/AKfycbzOHTFkoRZuGcqEPSL9xHOerFT7JtiBwpgWCCT0UD9qDnYkxL9rgXwDfc0ij0ZSiXnI/exec"

    try {
      await fetch(googleSheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      setStatus({ success: true, message: "Message sent successfully!" })
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setStatus({ success: false, message: "Something went wrong. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <>
      <Head>
        <title>Contact Us | Hiralal App</title>
        <meta name="description" content="Get in touch with us via Telegram or send a direct message." />
      </Head>

      <main className="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-center p-6 antialiased selection:bg-primary selection:text-white">
        
        <div className="w-full max-w-5xl space-y-12">
          
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-gray-500 font-medium text-lg max-w-md mx-auto">Choose your preferred way to connect with our team.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <motion.div 
              initial="hidden" animate="visible" variants={fadeInUp}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col justify-between items-center text-center group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary text-4xl font-black group-hover:scale-110 transition-transform duration-500">
                  TG
                </div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Telegram Bot</h2>
                <p className="text-gray-500 leading-relaxed font-medium">
                  Instant support with a standard message. Start a chat directly on Telegram for quick assistance.
                </p>
              </div>

              <div className="w-full pt-12">
                <a 
                  href={telegramBotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-bold py-5 px-8 rounded-2xl shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-1 active:scale-95"
                >
                  Message on Telegram
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" animate="visible" variants={fadeInUp}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col space-y-6 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            >
              <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Direct Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Name</label>
                  <input 
                    type="text" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/20 outline-none transition-all font-semibold"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Email</label>
                  <input 
                    type="email" name="email" required value={formData.email} onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/20 outline-none transition-all font-semibold"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Message</label>
                  <textarea 
                    name="message" rows="3" required value={formData.message} onChange={handleChange}
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary/20 outline-none transition-all font-semibold resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                <button 
                  type="submit" disabled={loading}
                  className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white font-bold py-5 px-8 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                  ) : "Send Message"}
                </button>

                {status.message && (
                  <p className={`text-xs text-center font-bold uppercase tracking-widest mt-2 ${status.success ? "text-green-500" : "text-red-500"}`}>
                    {status.message}
                  </p>
                )}
              </form>
            </motion.div>

          </div>

          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center pt-8">
            <Link href="/" className="inline-flex items-center text-sm font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors py-3 px-8 rounded-full border border-gray-100 bg-white shadow-sm hover:shadow-md">
              ← Back to Base
            </Link>
          </motion.div>

        </div>

      </main>
    </>
  )
}
