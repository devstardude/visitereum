import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
const activeChainId = ChainId.Mumbai;
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <Navbar />
        <div className="prose sm:prose-md lg:prose-xl dark:prose-invert max-w-none">
          <Component {...pageProps} />
        </div>
        <Footer />
      </ThirdwebProvider>
    </>
  );
}
