import { useEffect, useState } from "react";
import styles from "./style.module.css";
import Button from "../../../shared/Button";
import Visited from "./Visited";
import HallOfFame from "./HallOfFame";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import {
  vistereumABI,
  address as contractAddress,
} from "../../../../contract/abi/visitereum";
import { useAuth } from "../../../shared/context/AuthContext";

const types: string[] = ["Urban", "Nature", "Sea", "Others"];

interface ContentTab {
  urladdress: string;
}
const ContentTab = ({ urladdress }: ContentTab) => {
  // context states
  const authContext = useAuth();
  const { setUserPlaceCount } = authContext;

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
  } = useContractRead(contract, "getUserPlaces", urladdress);

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

        // set user place count context
        const userPlaceCountContext = {
          urban: userPlacesArray.filter((place) => place.type === types[0])
            .length,
          nature: userPlacesArray.filter((place) => place.type === types[1])
            .length,
          sea: userPlacesArray.filter((place) => place.type === types[2])
            .length,
          others: userPlacesArray.filter((place) => place.type === types[3])
            .length,
        };
        setUserPlaceCount(userPlaceCountContext);
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
        {tab ? (
          <Visited data={places} />
        ) : (
          <HallOfFame urladdress={urladdress} />
        )}
      </div>
    </div>
  );
};

export default ContentTab;
