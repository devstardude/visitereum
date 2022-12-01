import { useEffect, useState } from "react";
import styles from "./style.module.css";
import Button from "../../../shared/Button";
import Visited from "./Visited";
import HallOfFame from "./HallOfFame";
import { VisitedArray } from "./type";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import {
  vistereumABI,
  address as contractAddress,
} from "../../../../contract/abi/visitereum";

const visitedPlaces: VisitedArray = [
  {
    id: "01",
    address: "Urban",
    description: "Had fun there",
    lattitude: "10000",
    longitude: "10000",
    type: "Urban",
  },
  {
    id: "01",
    address: "Urban 2",
    description: "Had fun there",
    lattitude: "10000",
    longitude: "10000",
    type: "Urban",
  },
  {
    id: "02",
    address: "Nature",
    description: "Had fun there",
    lattitude: "10000",
    longitude: "10000",
    type: "Nature",
  },
  {
    id: "02",
    address: "Nature 2",
    description: "Had fun there",
    lattitude: "10000",
    longitude: "10000",
    type: "Nature",
  },
  {
    id: "02",
    address: "Sea",
    description: "Had fun there",
    lattitude: "10000",
    longitude: "10000",
    type: "Sea",
  },
  {
    id: "02",
    address: "Sea 2",
    description: "Had fun there",
    lattitude: "10000",
    longitude: "10000",
    type: "Sea",
  },
  {
    id: "02",
    address: "Others",
    description: "Had fun there",
    lattitude: "10000",
    longitude: "10000",
    type: "Otherss",
  },
  {
    id: "02",
    address: "Others 2",
    description: "Had fun there",
    lattitude: "10000",
    longitude: "10000",
    type: "Otherss",
  },
];

interface ContentTab {
  address: string;
}

const ContentTab = ({ address }: ContentTab) => {
  const [tab, setTab] = useState<boolean>(true);
  const [places, setPlace] = useState<any>(null);
  // connect to contract
  const {
    contract,
    isLoading: stateLoading,
    error: stateError,
  } = useContract(contractAddress, vistereumABI);

  const {
    data: getUserPlaceIds,
    isLoading,
    error,
  } = useContractRead(contract, "getUserPlaces", address);

  useEffect(() => {
    const getUserPlaces = async () => {
      if (contract && getUserPlaceIds && getUserPlaceIds.lenght !== 0) {
        let userPlacesArray = [];
        for (const i of getUserPlaceIds) {
          const place = await contract.call("getPlace", i);
          const placeObject = {
            address: place.userAddress,
            description: place.description,
            lattitude: place.latitude,
            longitude: place.longitude,
            type: place.typeOfPlace,
            image: place.imageUrl,
          };
          userPlacesArray.push(placeObject);
        }
        setPlace(userPlacesArray);
      }
    };
    getUserPlaces();
  }, [getUserPlaceIds, contract]);
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
        {tab ? <Visited data={places} /> : <HallOfFame />}
      </div>
    </div>
  );
};

export default ContentTab;
