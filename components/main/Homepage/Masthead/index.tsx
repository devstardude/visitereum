import Lottie from "lottie-react";
import WorldTour from "../../../assets/world-tour.json";
import styles from "./style.module.css";
const Masthead = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h6>Visitéreum</h6>
        <p>
          Track your visited places on Blockchain. <br /> and so much more...
        </p>
      </div>

      <div className={styles.LottieContainer}>
        <Lottie animationData={WorldTour} loop={true} />
      </div>
    </div>
  );
};

export default Masthead;
