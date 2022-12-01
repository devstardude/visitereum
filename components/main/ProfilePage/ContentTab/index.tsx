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
