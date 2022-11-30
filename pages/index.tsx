import Head from "next/head";
import styles from "../styles/Home.module.css";
import Homepage from "../components/main/Homepage";
import { useState } from "react";
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
