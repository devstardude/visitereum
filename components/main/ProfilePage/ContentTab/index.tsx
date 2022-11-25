import { useState } from "react";
import styles from "./style.module.css";
import Button from "../../../shared/Button";
import Visited from "./Visited";
import HallOfFame from "./HallOfFame";
const ContentTab = () => {
  const [tab, setTab] = useState<boolean>(true);
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button clicked={() => setTab(true)} active={tab === true}>
          Visited Places
        </Button>
        <Button clicked={() => setTab(false)} active={tab === false}>
          Hall of Fame
        </Button>
      </div>
      <div className={styles.contentContainer}>{tab ? <Visited /> : <HallOfFame />}</div>
    </div>
  );
};

export default ContentTab;
