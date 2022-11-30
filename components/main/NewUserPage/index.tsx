import UserProfileDataSet from "../../shared/UserProfileDataSet";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { userData } from "../ProfilePage/types";
import styles from "./style.module.css";
import { useState } from "react";
import Button from "../../shared/Button";
import { readProfile } from "../../utils/readProfile";
import { writeProfile } from "../../utils/writeProfie";
import { storeImage } from "../../utils/storeImage";
import { storeJsonIpfs } from "../../utils/storeJsonIpfs";
import {
  vistereumABI,
  address as contractAddress,
} from "../../../contract/abi/visitereum";
import { useAuth } from "../../shared/context/AuthContext";


const NewUserPage = () => {
  const address = useAddress();
  const authContext = useAuth();
  const { did, setDid } = authContext;
  const [profile, setProfile] = useState<any>(null);
  const {
    contract,
    isLoading: stateLoading,
    error: stateError,
  } = useContract(contractAddress, vistereumABI);
  const {
    mutate: addUser,
    isLoading: writeLoading,
    error: writeError,
  } = useContractWrite(contract, "addUser");

  const fetchProfile = async () => {
    if (address) {
      const ids = await readProfile(address);
      if (ids) {
        setProfile(ids);
      } else {
        setProfile({});
      }
    }
  };

  const setProfileData = async (data: userData) => {
    if (data.image) {
      const imageUrl = await storeImage(data.image, data.image.name);
      data.image = imageUrl;
    }
    if (address) {
      const profileDid = await writeProfile(address, data);
      const cid = await storeJsonIpfs(profileDid);
      addUser([address, cid]);
      setDid(cid);
    }
  };
  return (
    <div className={styles.container}>
      <h3>
        <span>Hey Traveller,</span> Looks like you're new here.
      </h3>
      {!profile ? (
        <p>
          ( Click here to fetch your profile if it already exists on Ceramic
          Clay testnet)
        </p>
      ) : (
        <p>Please fill any remaining fields.</p>
      )}

      <div className={styles.formDiv}>
        {profile ? (
          <>
            <UserProfileDataSet
              userData={profile}
              submitData={setProfileData}
            />
          </>
        ) : (
          <div className={styles.buttonContainer}>
            <Button clicked={fetchProfile}>Get profile</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewUserPage;
