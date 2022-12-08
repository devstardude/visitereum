import Tour from "../../../assets/tour.json";
import Lottie from "lottie-react";
import styles from "./style.module.css";
import { greatVibes } from "../../../../Fonts";

const Masthead = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h6 className={greatVibes.className}>
          <span className={greatVibes.className}>Visitéreum</span>
        </h6>
        <p>
          Track your visited places on Blockchain. <br /> and so much more...
        </p>
      </div>

      <div className={styles.LottieContainer}>
        <Lottie animationData={Tour} loop={true} />
      </div>
    </div>
  );
};

export default Masthead;
