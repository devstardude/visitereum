import { motion, AnimatePresence } from "framer-motion";
import styles from "./style.module.css";
const Ending = () => {
  const animation = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeIn" }}
        variants={animation}
        className={styles.container}
      >
        <h2>Keep track of your adventures</h2>
        <h6>With Automatic place search, maps and so much more...</h6>
      </motion.div>
    </AnimatePresence>
  );
};

export default Ending;
