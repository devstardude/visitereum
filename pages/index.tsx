import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/shared/Navbar";
import Homepage from "../components/main/Homepage";

export default function Home() {
  return (
    <div className={styles.container}>
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
