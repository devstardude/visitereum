import { useEffect, useState } from "react";
import Lottie from "lottie-react";
// import Tour from "/tour.json";
import styles from "./style.module.css";
const Masthead = ({ result }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h6>Visitéreum</h6>
        <p>
          Track your visited places on Blockchain. <br /> and so much more...
        </p>
      </div>

      <div className={styles.LottieContainer}>
        {result && <Lottie animationData={result} loop={true} />}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const lottie = await fetch(
    "https://assets10.lottiefiles.com/packages/lf20_xLbDyO.json"
  );
  const result = await lottie.json();
  return {
    props: { result },
  };
}

export default Masthead;
