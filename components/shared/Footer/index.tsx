import { handlee } from "../../../Fonts";
import styles from "./style.module.css";
const Footer = () => {
  return (
    <footer className={`${styles.container} ${handlee.className}`}>
      Build with Next.js and Blockchain
    </footer>
  );
};

export default Footer;
