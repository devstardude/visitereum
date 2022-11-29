import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Provider as CeramicProvidor } from "@self.id/framework";
import { AuthProvider } from "../components/shared/context/AuthContext";

const activeChainId = ChainId.Mumbai || ChainId.Mainnet;
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <CeramicProvidor client={{ ceramic: "testnet-clay" }}>
          <AuthProvider>
            <Navbar />
            <div className="prose sm:prose-md lg:prose-xl dark:prose-invert max-w-none">
              <Component {...pageProps} />
            </div>
            <Footer />
          </AuthProvider>
        </CeramicProvidor>
      </ThirdwebProvider>
    </>
  );
}
