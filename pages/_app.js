import "../styles/globals.css";
import Head from "next/head"; // 1. Sabse pehle Head ko import karein
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* 2. Head component ke andar apna meta tag dalein */}
      <Head>
      <meta name="google-site-verification" content="q0b4yz2CPItQOTvnzs_Zj-klve3kJeHtpYjB_QqyhNw" />
      </Head>
      
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}