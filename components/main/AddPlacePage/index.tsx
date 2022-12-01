import { placeDataWrite } from "../ProfilePage/types";
import AddPlaceForm from "./AddPlaceForm";
import styles from "./style.module.css";
import { useState } from "react";
import LoadingScreen from "../../shared/LoadingScreen";
import { imageOptimizer } from "../../utils/imageOptimizer";
import { storeImage } from "../../utils/storeImage";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import {
  vistereumABI,
  address as contractAddress,
} from "../../../contract/abi/visitereum";
import Router from "next/router";

const AddPlacePage = () => {
  const [loadingScreen, setLoadingScreen] = useState(false);

  //wallet
  const wallet = useAddress();

  //contract connection
  const {
    contract,
    isLoading: stateLoading,
    error: stateError,
  } = useContract(contractAddress, vistereumABI);

  //add user to contract
  const {
    mutate: addPlace,
    isLoading: writeLoading,
    error: writeError,
  } = useContractWrite(contract, "addPlace");

  const placeDataSubmitHandler = async (placeData: placeDataWrite) => {
    if (wallet && placeData.image) {
      console.log(placeData);

      // start loading
      setLoadingScreen(true);
      // upload image, get cid

      const optimizedImage = await imageOptimizer(placeData.image);

      const cidUrl = await storeImage(optimizedImage, placeData.image.name);

      // upload to blockchain
      const { id, address, description, lattitude, longitude, type } =
        placeData;
      await addPlace([
        id,
        address,
        description,
        cidUrl,
        lattitude,
        longitude,
        type,
      ]);
      //loading off
      setLoadingScreen(false);
      
      // redirect
      Router.push(`/profile/${wallet}`);
    }
    if (!placeData.image) {
      alert("Please add image");
    }
    if (!wallet) {
      alert("Please connect wallet");
    }
  };
  return (
    <div className={styles.container}>
      {loadingScreen && <LoadingScreen />}
      <h3>Add place</h3>
      <AddPlaceForm placeData={placeDataSubmitHandler} />
    </div>
  );
};

export default AddPlacePage;
