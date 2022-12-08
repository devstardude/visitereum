import dynamic from "next/dynamic";
import { Suspense } from "react";
import Head from "next/head";
import LoadingScreen from "../components/shared/LoadingScreen";

const Homepage = dynamic(() => import("../components/main/Homepage"), {
  suspense: true,
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>Visitereum</title>
        <meta name="description" content="Track visited places on Blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Suspense fallback={<LoadingScreen />}>
          <Homepage />
        </Suspense>
      </div>
    </div>
  );
}
