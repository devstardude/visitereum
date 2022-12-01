import UserProfileDataSet from "../../shared/UserProfileDataSet";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { userData } from "../ProfilePage/types";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
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
import LoadingScreen from "../../shared/LoadingScreen";
import { usePublicRecord } from "@self.id/framework";
import Router from "next/router";

const UserEditPage = () => {
  const [loadingScreen, setLoadingScreen] = useState(false);

  //wallet
  const address = useAddress();

  //context states
  const authContext = useAuth();
  const { userExist, setUserExist, userDid } = authContext;

  //if profile exists
  const [profile, setProfile] = useState<any>(null);

  const { content, isLoading, isError, error } = usePublicRecord(
    "basicProfile",
    userDid ? userDid : ""
  );

  //contract connection
  const {
    contract,
    isLoading: stateLoading,
    error: stateError,
  } = useContract(contractAddress, vistereumABI);

  //add user to contract
  const {
    mutate: addUser,
    isLoading: writeLoading,
    error: writeError,
  } = useContractWrite(contract, "addUser");

  // fetch did profile
  const fetchProfile = async () => {
    if (address) {
      setLoadingScreen(true);
      const ids = await readProfile(address);
      if (ids) {
        setProfile(ids);
      } else {
        setProfile({});
      }
      setLoadingScreen(false);
    }
  };

  // set profile data
  const setProfileData = async (data: userData) => {
    setLoadingScreen(true);
    if (data.image) {
      const imageUrl = await storeImage(data.image, data.image.name);
      data.image = imageUrl;
    }
    if (address) {
      const profileDid = await writeProfile(address, data);
      if (userExist === false) {
        const cid = await storeJsonIpfs(profileDid);
        addUser([address, cid]);
        setUserExist(true);
      }
      setLoadingScreen(false);
      Router.push(`/profile/${address}`);
    }
  };

  useEffect(() => {
    if (userExist === null) {
      Router.push(`/`);
    }
  }, [userExist]);
  return (
    <div className={styles.container}>
      {loadingScreen && <LoadingScreen />}
      {!userExist && (
        <h3>
          <span>Hey Traveller,</span> Looks like you're new here.
        </h3>
      )}
      {userExist && (
        <h3>
          <span>Edit profile,</span>
        </h3>
      )}

      {!userExist ? (
        <p>
          ( Click here to fetch your profile if it already exists on Ceramic
          Clay testnet)
        </p>
      ) : (
        <p>Please fill any remaining fields.</p>
      )}

      <div className={styles.formDiv}>
        {!userExist && (
          <div className={styles.buttonContainer}>
            <Button clicked={fetchProfile}>Get profile</Button>
          </div>
        )}
        {userExist && content && (
          <>
            <UserProfileDataSet
              userData={content}
              submitData={setProfileData}
            />
          </>
        )}
        {profile && (
          <>
            <UserProfileDataSet
              userData={profile}
              submitData={setProfileData}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserEditPage;
