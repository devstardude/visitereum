import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import styles from "./style.module.css";
const Masthead = () => {
  const [lottie, setLottie] = useState(null);
  useEffect(() => {
    const getLottie = async () => {
      const lottie = await fetch(
        "https://assets2.lottiefiles.com/packages/lf20_ccdz2hzz.json"
      );
      const result = await lottie.json();
      setLottie(result);
    };
    getLottie();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h6>Visitéreum</h6>
        <p>
          Track your visited places on Blockchain. <br /> and so much more...
        </p>
      </div>

      <div className={styles.LottieContainer}>
        {lottie && <Lottie animationData={lottie} loop={true} />}
      </div>
    </div>
  );
};

export default Masthead;
