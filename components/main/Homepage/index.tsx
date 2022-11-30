import InfoSection from "./InfoSection";
import Masthead from "./Masthead";
import styles from "./style.module.css";
const Homepage = () => {
  return (
    <div className={styles.container}>
      <Masthead />
      <InfoSection />
    </div>
  );
};

export default Homepage;
