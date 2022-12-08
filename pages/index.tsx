import Head from "next/head";
import Homepage from "../components/main/Homepage";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Visitereum</title>
        <meta name="description" content="Track visited places on Blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Homepage />
      </div>
    </div>
  );
}
