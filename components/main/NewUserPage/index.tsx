import UserProfileDataSet from "../../shared/UserProfileDataSet";
import { EthereumAuthProvider, SelfID, WebClientSession } from "@self.id/web";
import { useAddress } from "@thirdweb-dev/react";
import { userData } from "../ProfilePage/types";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import Button from "../../shared/Button";
import { readProfile } from "../../utils/readProfile";
import { writeProfile } from "../../utils/writeProfie";
const NewUserPage = () => {
  const address = useAddress();
  const [profile, setProfile] = useState<any>(null);
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
    console.log(data);
    if (address) {
      await writeProfile(address, data);
    }
  };
  return (
    <div className={styles.container}>
      <h3>
        <span>Hey Traveller,</span> Looks like you're new here.
      </h3>
      <p>
        ( Click here to fetch your profile if it already exists on Ceramic Clay
        testnet)
      </p>
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
