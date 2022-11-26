import { useState } from "react";
import styles from "./style.module.css";
import Button from "../../../shared/Button";
import Visited from "./Visited";
import HallOfFame from "./HallOfFame";
import { VisitedArray } from "./type";

const visitedPlaces: VisitedArray = [
  {
    id: "01",
    address: "Urab",
    description: "Had fun there",
    lattitude: "10000",
    longitude: "10000",
    type: 0,
  },
  {
    id: "02",
    address: "Nature",
    description: "Had fun there",
    lattitude: "10000",
    longitude: "10000",
    type: 1,
  },
  {
    id: "02",
    address: "Sea",
    description: "Had fun there",
    lattitude: "10000",
    longitude: "10000",
    type: 1,
  },
  {
    id: "02",
    address: "Others",
    description: "Had fun there",
    lattitude: "10000",
    longitude: "10000",
    type: 1,
  },
];
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
      <div className={styles.contentContainer}>
        {tab ? <Visited data={visitedPlaces} /> : <HallOfFame />}
      </div>
    </div>
  );
};

export default ContentTab;
