import { useState } from "react";
import styles from './style.module.css'
import Button from "../../../shared/Button";
const ContentTab = () => {
  const [tab, setTab] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button>Visited Places</Button>
        <Button>Hall of Fame</Button>
      </div>
    </div>
  );
};

export default ContentTab;
