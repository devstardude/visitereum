import Tour from "../../../assets/tour.json";
import Lottie from "lottie-react";
import styles from "./style.module.css";
import { motion } from "framer-motion";
import { greatVibes } from "../../../../Fonts";

// Motion animation objects
const heading = {
  initial: { opacity: 0, x: "50px" },
  animate: { opacity: 1, x: "0px" },
  transition: { ease: "easeOut", duration: 1, delay: 0.1 },
};

const subHeading = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { ease: "easeOut", duration: 2, delay: 1.2 },
};

const Masthead = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <motion.h6
          initial={heading.initial}
          animate={heading.animate}
          transition={heading.transition}
          className={greatVibes.className}
        >
          <span className={greatVibes.className}>Visitéreum</span>
        </motion.h6>
        <motion.p
          initial={subHeading.initial}
          animate={subHeading.animate}
          transition={subHeading.transition}
        >
          Track your visited places on Blockchain. <br /> and so much more...
        </motion.p>
      </div>

      <div className={styles.LottieContainer}>
        <Lottie animationData={Tour} loop={true} />
      </div>
    </div>
  );
};

export default Masthead;
