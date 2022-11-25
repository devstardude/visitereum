import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div className="prose sm:prose-md lg:prose-xl dark:prose-invert max-w-none">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}
