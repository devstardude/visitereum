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
import PageTitle from "../../shared/PageTitle";
import { MdLocationOn } from "react-icons/md";

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
      if (contract) {
        try {
          await contract.call(
            "addPlace",
            id,
            address,
            description,
            cidUrl,
            lattitude,
            longitude,
            type
          );
        } catch (err) {
          console.log(err);
          alert("Something went wrong, Please try again");
          setLoadingScreen(false);
          return;
        }
      }

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
      <PageTitle text="Add place" icon={<MdLocationOn />} />
      <AddPlaceForm placeData={placeDataSubmitHandler} />
    </div>
  );
};

export default AddPlacePage;
